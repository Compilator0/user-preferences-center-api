import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../../declarations';
import app from '../../../app';
import { QueryTypes } from 'sequelize';
import { UsersHistoryServiceInterface } from './users.history.interface';


export class UsersHistory extends Service implements UsersHistoryServiceInterface {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }


  /*
    The SQL request below is the same as the query explained above but dont include the field 'history_start_at' 
    wich is not necessary here since we dont want to limit the list of user's orderdred events.
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
  */
  async getUserConsentStateHistory(userUUID : any) : Promise<any | any[]> {

    return await app.get('sequelizeClient').query(
      'SELECT e1.consent_label as id, e1.consent_decision as enabled, e1.created_at, ( SELECT COUNT(*) FROM ( SELECT * FROM events ev WHERE ev.user_uuid = $uuid GROUP BY ev.consent_label )  sub_events ) as history_start_at FROM events e1 WHERE e1.user_uuid = $uuid AND e1.created_at = ( SELECT MAX(e2.created_at) FROM events e2 WHERE e2.user_uuid = e1.user_uuid AND e2.consent_label = e1.consent_label AND e2.consent_decision = e1.consent_decision ) ORDER BY e1.created_at DESC',      
      {
        bind: { uuid: userUUID },
        type: QueryTypes.SELECT
      }
    ).then( (result: any) => {
      result.forEach( (consent: any) => {
        ( consent.enabled === 0 ) ? consent.enabled = false : consent.enabled = true;
      });
      // return the consent state of the user that includes his events history
      return result;
    });
  }   

  // end of class
}
