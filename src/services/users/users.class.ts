import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import app from '../../app';
import { Op } from 'sequelize';
import { UsersServiceInterface } from './users.service.interface';

export class Users extends Service implements UsersServiceInterface {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async getUserConsentState(userUUID : any) {
    const UsersModel = app.get('sequelizeClient').models.users;
    const ConsentModel = app.get('sequelizeClient').models.consent;
    const EventsModel = app.get('sequelizeClient').models.events;
    
    /*
    return await ConsentModel.findAll({
      attributes: ['id', 'createdAt'],
      include: {
        model: EventsModel
      }
    });
    */
    
    return (await UsersModel.findOne({
      attributes: [ ['uuid', 'id'], 'uuid', 'email'],
      where: { 
        uuid: {
          [Op.eq]: userUUID
        }
      },
      include: {
        model: ConsentModel,
        attributes: ['consentLabel', 'consentDecision']
      }
    })).toJSON();
    
  } 

}


/*
attributes: ['id', 'enabled'],
through: {
  attributes: ['id']
}
*/