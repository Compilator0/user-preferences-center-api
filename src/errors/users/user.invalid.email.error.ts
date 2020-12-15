import { FeathersError } from '@feathersjs/errors';

export class UserInvalidEmail extends FeathersError {
  constructor(message: string, data: any) {
    // I send a 422 code (Unprocessable) as recommended by the exercice
    super(message, 'Invalid email Exception', 422, 'UserInvalidEmail', data);
  }
}


