import assert from 'assert';
import app from '../../src/app';

describe('\'api-users\' service', () => {
  it('registered the service', () => {
    const service = app.service('api-users');

    assert.ok(service, 'Registered the service');
  });
});
