import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import { renameKey } from '../../utils/didomi.jstools';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

  /*
    An anonymous function that will use the API client's data in the Hook context to build a consent object
    It will be called before every CRUD request on consent service. 
  */
  const buildConsentDataToStore = () => {
    return async (context: HookContext) => {
      const { data } = context;
      if(context.data !== undefined){
          // We build a the consent object to store, according to the API client's data
          // 3 fields will be automatically added to the object by the Sequelise schema of the table : auto-increment id, createdAt, updatedAt
          context.data = {
            'consentLabel': data.id,
            'consentDecision': data.enabled
          };
      }
      else{
        throw new Error("No consent data to send with the request")
      }
      //return the context as best practice
      return context;
    }
  } 

  /*
    An anonymous function that will every time before returning the consent to the API's client
    It will be called after every CRUD request on consent service. 
  */
  const buildConsentDataToRestore = () => {
    return async (context: HookContext) => {
      const { result, method } = context;
      console.log('aeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      console.log(result);
      if(result){
          console.log('paeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
          console.log(result);
          // Function that prepare the consent result to the API client's formats
          const buildConsentToReturn = async (currentConsent: any) => {
            // We build a the consent object to restore, according to the API client's format
            currentConsent = {
              'id': currentConsent.consentLabel,
              'enabled': currentConsent.consentDecision
            };
            console.log('azzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
            console.log(context);
            return currentConsent;
          }
          if(method === 'find') {
            console.log('feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            console.log(result);
            // Map on the list of consent data to build the consent data to return 
            context.result = await Promise.all(result.data.map(buildConsentToReturn));
          }
          else {
            // Otherwise just update the single result
            console.log('neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            console.log(result);
            context.result = await buildConsentToReturn(result);
          } 
        
      } 
      
      // We return the hook context
      return context;
    }
};

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ buildConsentDataToStore() ],
    update: [ buildConsentDataToStore() ],
    patch: [ buildConsentDataToStore() ],
    remove: [ buildConsentDataToStore() ]
  },

  after: {
    all: [ buildConsentDataToRestore() ],
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
