import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import app from '../../app';
import { Op } from 'sequelize';

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async getUserConsentState(id : any) {
    const UsersModel = app.get('sequelizeClient').models.users;
    const ConsentModel = app.get('sequelizeClient').models.consent;
    const EventsModel = app.get('sequelizeClient').models.events;
    
    /*
    return await ConsentModel.findAll({
      attributes: ['consentLabel', 'createdAt'],
      include: {
        model: EventsModel
      }
    });
    */
    
    return await UsersModel.findOne({
      attributes: ['id', 'email'],
      where: { 
        id: {
          [Op.eq]: id
        }
      },
      include: {
        model: ConsentModel,
        attributes: ['consentLabel', 'consentDecision']
      }
    }, {raw: false});
    
  } 

}


/*
attributes: ['consentLabel', 'consentDecision'],
through: {
  attributes: ['id']
}
*/