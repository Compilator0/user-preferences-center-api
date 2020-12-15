import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';


// This class if for authentication service on top of the API via JWT Tokens 
export class ApiUsers extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
