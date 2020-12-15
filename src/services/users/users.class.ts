import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import app from '../../app';
import { QueryTypes } from 'sequelize';
import { UsersServiceInterface } from './users.service.interface';

export class Users extends Service implements UsersServiceInterface {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  /*
    The SQL request below is a reflexive query on 'events' table.
    I've used it in the function below to obtain a user 'consent state' by fetching the history of events registered 
    for the user whose userUuid is passed as function parameter. The list returned is ordered by the column 'created_at'
    
    => The custom field 'history_start_at' in my request will contain a number.
       This field is used for the '/users-history' custom service, in the second method below 'getUserConsentStateHistory()'.
       The 'history_start_at' value is a number that will be used at the Users Hook layer to define the limit of number of events to display to API client 
       when don't want to display all the events history of a user (this is the default behaviour according to the exercice). 
       This history_start_at also represent the number of 'type of consent' that has been registered for the current user.

       E.g : The history_start_at value will be 2 if the userUuid is related to 2 'types of consent' (email_notification, sms_notification)
       This enables in the future, the possibility to add new type of consent like 'phone_call_notification' without changing the code at this software layer

    <<
        SELECT 
            e1.consent_label as id, 
            e1.consent_decision as enabled,
            (
              SELECT COUNT(*)
              FROM (
                    SELECT * FROM events ev
                    WHERE ev.user_uuid = $uuid
                    GROUP BY ev.consent_label
                   ) 
                   sub_events
            ) as history_start_at
        FROM events e1 
        WHERE e1.user_uuid = $uuid
        AND e1.created_at = (
                              SELECT MAX(e2.created_at) 
                              FROM events e2 
                              WHERE e2.user_uuid = e1.user_uuid 
                              AND e2.consent_label = e1.consent_label 
                              AND e2.consent_decision = e1.consent_decision
                            ) 
        ORDER BY e1.created_at DESC                              
    >>

    I notice that when a field is defined as boolean in the Sequelise Model, 
    Postgres creates a 'boolean' field (true or false values) while MySQL creates a 'Tinyint' fields (0 or 1 values))
    I formated the 'consent_decision' filed after the SQL request to prepare the result in the format wanted 
    by the API client : 'true or false' inside of '0 or 1', regardless of the database used
            
  */     
  async getUserConsentState(userUUID : any) : Promise<any | any[]> {

    return await app.get('sequelizeClient').query(
      'SELECT e1.consent_label as id, e1.consent_decision as enabled, ( SELECT COUNT(*) FROM ( SELECT * FROM events ev WHERE ev.user_uuid = $uuid GROUP BY ev.consent_label )  sub_events ) as history_start_at FROM events e1 WHERE e1.user_uuid = $uuid AND e1.created_at = ( SELECT MAX(e2.created_at) FROM events e2 WHERE e2.user_uuid = e1.user_uuid AND e2.consent_label = e1.consent_label AND e2.consent_decision = e1.consent_decision ) ORDER BY e1.created_at DESC',      
      {
        bind: { uuid: userUUID },
        type: QueryTypes.SELECT
      }
    ).then( (result: any) => {
      result.forEach( (consent: any) => {
        ( consent.enabled === 0 ) ? consent.enabled = false : consent.enabled = true;
      });
      // return the consent state of the user that includes his events history
      return result.length > 0 ? result.slice(0, result[0].history_start_at) : result;
    });
  } 

  // end of class
}
