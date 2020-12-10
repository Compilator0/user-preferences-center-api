// Initializes the `api-users` service on path `/api-users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ApiUsers } from './api-users.class';
import createModel from '../../models/api-users.model';
import hooks from './api-users.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'api-users': ApiUsers & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api-users', new ApiUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api-users');

  service.hooks(hooks);
}
