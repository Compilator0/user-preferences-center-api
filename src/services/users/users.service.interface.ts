
/**
 *  An interface listing all custom functions that can profit instance of Users 
 *  in addition to the user's REST service native methods
 */
export interface UsersServiceInterface {
    /**
     * Retrieve the consent state of a given User
     * returns the users consent state
     */
    getUserConsentState(userUUID: any) : Object;

}

