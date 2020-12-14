import { FeathersError } from '@feathersjs/errors';


export class UserExistingEmail extends FeathersError {
  constructor(message: any, data: any) {
    // I send a 422 code (Unprocessable) as recommended by the exercice
    super(message, 'Existing email Exeption', 422, 'UserExistingEmail', data);
  }
}


