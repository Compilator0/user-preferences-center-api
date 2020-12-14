
/**
 *  An interface listing all custom functions that can profit instances of Events class 
 *  in addition to the event's REST service native methods
 */
export interface EventsServiceInterface {
    /*
        Returning the list of consent data corresponding to a specific event
    */
   getFormatedEvent(userUuid: string): Object; 
   
}

