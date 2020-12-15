import { FeathersError } from '@feathersjs/errors';

export class EventServiceForbidden extends FeathersError {
  constructor(message: string, data: any) {
    // I send a 405 code (Method not allowed)
    super(message, 'Event service forbidden Exception', 405, 'EventServiceForbidden', data);
  }
}


