// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Users } from './users.class';
import createModel from '../../models/users.model';
import hooks from './users.hooks';
import { UsersHistory } from './users.history/users.history.class';
import usersHooks from './users.history/users.history.hooks';

// Add this service to the service type index
declare module '../../declarations' { 
  interface ServiceTypes {
    'users': Users & ServiceAddons<any>;
    'users-history': UsersHistory & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));


  // Initialize our service with any options it requires
  app.use('/users-history', new UsersHistory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  // Get our initialized service so that we can register hooks
  const historyService = app.service('users-history');

  service.hooks(hooks);

  historyService.hooks(usersHooks);

  
}
