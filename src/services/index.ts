import { Application } from '../declarations';
import apiUsers from './api-users/api-users.service';
import users from './users/users.service';
import consent from './consent/consent.service';
import events from './events/events.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(apiUsers);
  app.configure(users);
  app.configure(consent);
  app.configure(events);
}
