import assert from 'assert';
import app from '../src/app';

describe('authentication', () => {
  it('registered the authentication service', () => {
    assert.ok(app.service('authentication'));
  });
  
  describe('local strategy authentication test', () => {
    const userInfo = {
      email: 'idris.tsafack@didomi.com',
      password: 'mysweetyPassword'
    };

    before(async () => {
      try {
        await app.service('api-users').create(userInfo);
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user and creates accessToken', async () => {
      const authObject = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo
      }, {});
      assert.ok(authObject.accessToken, 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDgwMjI2NTIsImV4cCI6MTYwODEwOTA1MiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNyIsImp0aSI6IjE4ZjhmMTZkLWVmOWQtNDY5OS05MzdhLTE4OGFiZTY2NWFlNCJ9.noQY9DLKxGrUVe7faZ1b6WWwZIF4o4mrHMc70tivjWY');
      assert.ok(authObject['api-users'].email, userInfo.email);
    });
  });
});
