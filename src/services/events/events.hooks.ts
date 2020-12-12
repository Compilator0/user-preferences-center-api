import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
//import an utility function from didomi's JS tools
import { dateFormatter } from './../../utils/didomi.jstools';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

/*
  Controling the REST method to access the Event service
  According to the exercice we should not be able to update or delete envents
*/
const controlServiceAcces = () => {

  return async (context: HookContext) => {
    const { method } = context;
    if (method === 'update' || method === 'patch'  || method === 'remove'){ 
      throw new Error("This service forbidden !");
    }

    //returning the context as best practice
    return context;
  }
} 

/*
  Formating into the event's table format, the events information 
  and integrating them in the Hook context for further processing
*/
const transformIncommingEventsDataBeforeInsertion = () => {
  
  return async (context: HookContext) => {

    const { app, data, params } = context;

    const userOfInterest = await app.service('users').get(data.user.id, params);

    //Function that collects data needed for events insertion into the "association" table between User and Consent : the event table
    const buildEventtToPersist = async (consent : any) => {
      //find the current consent's IDs in database
      const consentOfInterest =  await app.service('consent').find({ query: { consentLabel: consent.id, enabled: consent.enabled } });       
      if(consentOfInterest.data[0].id !== undefined){
        //prepare the creation date of the event as recommended by the exercice
        let eventCreatedAt = new Date().getTime();
        //Building an event instance as it will be inserted accordingly to the "event" table structure.
        return { 'eventCreatedAt' : eventCreatedAt, 'userId' : userOfInterest.id, 'consentId' : consentOfInterest.data[0].id };
      }
      else{
        return {};
      }
    }

    //The object listOfEventToPersist is to collect the list of event to persist in database for the current User
    let listOfEventToPersist : Array<any> = [];
    if(data.consents){
      if(data.consents.length > 0){
        listOfEventToPersist = await Promise.all( data.consents.map(buildEventtToPersist) );
      }
      context.data = listOfEventToPersist; 
    } 
    else{
      throw new Error("No event has been sent by the User");
    }

    //returning the context as best practice
    return context;
  }
} 
 

export default {
  before: {
    //All securized all web service with Jwt token
    //control the REST method before each incoming request, the exercice require not be let possible event update and delete
    all: [ authenticate('jwt'), controlServiceAcces() ],
    find: [],
    get: [],
    //prepare our events data before storage into event table
    create: [ transformIncommingEventsDataBeforeInsertion() ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
