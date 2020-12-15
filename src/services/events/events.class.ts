import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import app from '../../app';
import { Application } from '../../declarations';
import { EventsServiceInterface } from './events.service.interface';

export class Events extends Service implements EventsServiceInterface {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  //overriding the create method of the REST service to take into account our Many to Many relationship
  async create(data: any | Array<any>, params?: Params): Promise<any | any[]> {
    //inserting list of events into the databse via bulkCreate, a simple create will not returned to the client the created ressources   
    return await app.get('sequelizeClient').models.events.bulkCreate( data, { validate: true }).then( ( resultList: any) => {
      return Promise.all( resultList.map( (events:any) => { return events.dataValues; }) );
    });
  } 
  
  // Getting a list of events registered in the same transaction by a user
  async getEventsByUserAndDate(event : any): Promise<any | any[]> {
    //inserting list of events into the databse via bulkCreate, a simple create will not returned to the client the created ressources
    const EventModel = app.get('sequelizeClient').models.events;
    return await EventModel.findAll({
      where: { 
        user_uuid: event.userUuid,
        created_at: event.createdAt
      }, 
      raw: true
    }).then( (result: any) => {
      result.forEach( (event: any) => {
        ( event.consentDecision === 0 ) ? event.consentDecision = false : event.consentDecision = true;
      });
      return result;
    });
  } 

  // Getting a list of events group by 'created_at' 
  async getEventsGroupByCreatedAt(): Promise<any | any[]> {
    const EventModel = app.get('sequelizeClient').models.events;
    return await EventModel.findAll( { group: 'created_at' , raw:true} ).then( (result: any) => {
      result.forEach( (event: any) => {
        ( event.consentDecision === 0 ) ? event.consentDecision = false : event.consentDecision = true;
      });
      return result;
    });
  } 
    

}
