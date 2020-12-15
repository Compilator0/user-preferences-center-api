import { FeathersError } from '@feathersjs/errors';

export class UsersHistoryServiceForbidden extends FeathersError {
  constructor(message: string, data: any) {
    // I send a 405 code (Method not allowed)
    super(message, 'Users events history forbidden Exception', 405, 'UsersHistoryServiceForbidden', data);
  }
}


