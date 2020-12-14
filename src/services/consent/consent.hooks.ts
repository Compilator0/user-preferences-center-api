import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import { renameKey } from '../../utils/didomi.jstools';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

  /*
    An anonymous function that will use the API client's data in the Hook context to build a consent object
    It will be called before every CRUD request on consent service. 
  */
  const formatConsentDataToStore = () => {
    return async (context: HookContext) => {
      const { data } = context;
      if(context.data !== undefined){
          // We build a the consent object to store, according to the client's API format
          // 3 fields will be automatically added to the object by the Sequelise schema of the table : auto-increment id, date, updatedAt
          context.data = {
            'consent_label': data.id,
            'consent_decision': data.enabled
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
    An anonymous function that will be called every time before returning the consent to the API's client
    It will be called after every CRUD request on consent service. 
  */
  const formatConsentToRestore = () => {
    return async (context: HookContext) => {
      const { result, method } = context;
      if(result){
          // Function that prepare the consent result to the API client's formats
          const buildConsentToReturn = async (currentConsent: any) => {
            // We build a the consent object to restore, according to the API client's format
            currentConsent = {
              'id': currentConsent.consent_label,
              'enabled': currentConsent.consent_decision
            };
            return currentConsent;
          }
          if(method === 'find') {
            // Map on the list of consent data to build the consent data to return 
            context.result = await Promise.all(result.data.map(buildConsentToReturn));
          }
          else {
            // Otherwise just update the single result
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
    create: [ formatConsentDataToStore() ],
    update: [ formatConsentDataToStore() ],
    patch: [ formatConsentDataToStore() ],
    remove: [ formatConsentDataToStore() ]
  },

  after: {
    all: [ formatConsentToRestore() ],
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
