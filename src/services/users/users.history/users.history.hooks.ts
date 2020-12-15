import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import { UsersHistoryServiceForbidden } from '../../../errors/users/history/users.history.service.forbidden';
import { UserExistingEmail } from '../../../errors/users/user.existing.email.error';
import { UserInvalidEmail } from '../../../errors/users/user.invalid.email.error';
import { emailIsValid, generateUserUUIDv1, deleteObjectFields, renameKey } from '../../../utils/didomi.jstools';
//import an utility function from didomi's JS tools

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;


/*
   A method to control every incomming request on User History custom service
   Will be ran on all incoming request to authorize only get and find requests for events history
*/
const requestAuthorization = () => {
  return async (context: HookContext) => {
      const { method, data } = context;
      if( method !== 'find' && method !== 'get' ) {
          throw new UsersHistoryServiceForbidden("This service is not authorize on Users events history custom service", data);
      }
      return context;
    }
}

/*
  A function that will build the Outgoing user consent state into the format of this exercice
  It will be called "after" every a User service request to ensure the user is returned in the format needed 
*/
const consentStateBuilder =  () => {

  return async (context: HookContext) => {
    // Get `app`, `method` and `result` from the hook context
    const { app, method, result } = context;

    // Function that adds the user consent state on every user returned by the find service of Users REST API
    const buildConsentState = async (currentUser: any) => {
        // I get the user consent state by fetching the last event registered for each of his consent 
        // I've designed a specific function for this stuff at the Users Class service Level : getUserConsentState(userUuid)
        let consentState = await app.service('users-history').getUserConsentStateHistory(currentUser.uuid);

        // The 'history_start_at' filed is a number, and additional information meaning that : "all the events starting from that number
        // are not related to the current state but are related to olds user states". They are filtered by createdAt DESC.
        if(consentState.length > 0){
            currentUser.history_start_at = consentState[0].history_start_at + 1;
        }
        // Renaming the uuid field of the current User to match the field name to be displayed 
        // and adding it as the first field of the object to return
        currentUser = renameKey(currentUser, 'uuid', 'id');
        currentUser = {
            id: currentUser.id,
            ...currentUser
        };
        // Adding an array of consents to the current User
        currentUser.consents = [];
        consentState.forEach( (currentConsent: any) => {
            currentUser.consents.push(currentConsent);
        });
        // Removing from the current user, fields that should not be displayed
        currentUser = deleteObjectFields(currentUser, 'createdAt', 'updatedAt');
        // Removing history_start_at field in consents
        console.log('-------------------------------------------------------');
        console.log(currentUser);
        currentUser.consents.map( (consent: any) => deleteObjectFields(consent, 'history_start_at'));

        //The current user is then returned with his famous consent state (array of his last consents relative to each type of consent (email_notification, sms_notification, ...)))
        return currentUser;
   };
   
   if (method === 'find') {
        if(result.data){
             if(result.data.length > 0){
                 // Map all Users from database to build Users consent state 
                  context.result = await Promise.all(result.data.map(buildConsentState));
              }
        }
   } else {
        //Otherwise just update the single result
        context.result = await buildConsentState(result);
   } 
   // We return the hook context
   return context;
 }

}


export default {
  before: {
    all: [ authenticate('jwt'), requestAuthorization() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ consentStateBuilder() ],
    find: [],
    get: [],
    create: [ ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }

};

