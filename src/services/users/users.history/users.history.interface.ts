
/**
 *  An interface listing all custom functions that can profit instance of Users 
 *  in addition to the user's REST service native methods
 */
export interface UsersHistoryServiceInterface {

    /**
     * Retrieves the consent state history of a given User
     * returns the users consent states history of events
     */
    getUserConsentStateHistory(userUUID: any) : Promise<any | any[]>;

}

