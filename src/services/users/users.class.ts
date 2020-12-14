import sequelize, { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import app from '../../app';
import { Op, QueryTypes } from 'sequelize';
import { UsersServiceInterface } from './users.service.interface';
import { deleteObjectFields } from '../../utils/didomi.jstools';

export class Users extends Service implements UsersServiceInterface {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  /*
      I get the user consent state by fetching the last event registered for each of his consent
  */
  async getUserConsentState(userUUID : any) {

    return await app.get('sequelizeClient').query(
        'SELECT c.consent_label, c.consent_decision, e1.created_at FROM events e1, consent c WHERE e1.uuid = $uuid AND e1.consent_id = c.id AND e1.created_at = (SELECT MAX(e2.created_at) FROM events e2 WHERE e2.consent_id = e1.consent_id AND e2.uuid = e1.user_uuid) ORDER BY e1.created_at DESC',
        {
          bind: { uuid: userUUID },
          type: QueryTypes.SELECT
        }
    ).then( (result: any) => {
        result.forEach( (consent: any) => {
            //I've observed that when a field is defined as boolean in the Sequelise Model, 
            // Postgres creates a 'boolean' filed while MySQL creates a 'Tinyint' fields with 0 or 1 as possible values
            // We to prepare the result in the format wanted by the by the API client : true or false regardless of the database used
            ( consent.consent_decision === 0 ) ? consent.consent_decision = false : consent.consent_decision = true;
        });
        return result;
    });
     
    //This is the reflexive query above that I've executed on the table of 'events' to have the last event register by the user per 'consent' registered
    // I've joined the consent table to pick up the consent_label and the consent_decision relative to the consent_id in the table 'events'
    /*
      SELECT c.consent_label, c.consent_decision
      FROM events e1, consent c
      WHERE e1.uuid = '81b289bc-34be-461a-8cd9-0e13d777a21e'
      AND e1.consent_id = c.id
      AND e1.created_at = (SELECT MAX(e2.created_at)
    				   FROM events e2 
    				   WHERE e2.consent_id = e1.consent_id
    				   AND e2.uuid = e1.user_uuid)
      ORDER BY e1.created_at DESC
    */
  } 

  async getUserConsentStateBySequelizeSynthax(userUUID : any) {
    const UsersModel = app.get('sequelizeClient').models.users;
    const ConsentModel = app.get('sequelizeClient').models.consent;
    const EventsModel = app.get('sequelizeClient').models.events;

    return (await UsersModel.findOne({
      attributes: [ ['uuid', 'id'], 'uuid', 'email'],
      where: { 
        uuid: {
          [Op.eq]: userUUID
        }
      },
      include: {
        model: ConsentModel,
        attributes: ['consent_label', 'consent_decision']
      }
    })).toJSON();
    
  } 


  // end of class
}
