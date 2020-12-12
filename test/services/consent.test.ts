import assert from 'assert';
import app from '../../src/app';

describe('\'consent\' service', () => {
  it('registered the service', () => {
    const service = app.service('consent');

    assert.ok(service, 'Registered the service');
  });
});
