import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import app from '../../app';
import { Application } from '../../declarations';

export class Events extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  //overriding the create method of the REST service to take into account our Many to Many relationship
  async create(data: any | Array<any>, params?: Params): Promise<any | any[]> {
    const insertEventInDatabase = async (p_event : any) => {
        await app.get('sequelizeClient').models.events.create(p_event); 
    }
    //inserting list of events into the databse
    return await Promise.all( data.map(insertEventInDatabase) ); 
  } 

}
