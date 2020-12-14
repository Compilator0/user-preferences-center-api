import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Op } from 'sequelize';
import app from '../../app';
import { Application } from '../../declarations';
import { EventsServiceInterface } from './events.service.interface';

export class Events extends Service implements EventsServiceInterface {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  /*
    Returning and event object formated as the API client's want
  */
  async getFormatedEvent(userUUID: string) {
    // Getting the event Model
    const UsersModel = app.get('sequelizeClient').models.users;
    const ConsentModel = app.get('sequelizeClient').models.consent;
    return await UsersModel.findOne({
      attributes: ['uuid'],
      where: { 
        uuid: {
          [Op.eq]: userUUID
        }
      },
      include: {
        model: ConsentModel
      }
    });
  } 

  //overriding the create method of the REST service to take into account our Many to Many relationship
  async create(data: any | Array<any>, params?: Params): Promise<any | any[]> {
    // Anonymous function to on Promise.All below 
    const insertEventInDatabase = async (userEvent : any) => {
        await app.get('sequelizeClient').models.events.create(userEvent); 
    }
    //inserting list of events into the databse
    return await Promise.all( data.map(insertEventInDatabase) ); 
  } 

}
