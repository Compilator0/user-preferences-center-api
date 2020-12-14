import { FeathersError } from '@feathersjs/errors';

export class ZeroEvent extends FeathersError {
  constructor(message: any, data: any) {
    // I send a 406 code (Not acceptable)
    super(message, 'Zero event Exception', 406, 'ZeroEvent', data);
  }
}


