
/**
 *  An interface listing all custom functions that can profit instances of Events class 
 *  in addition to the event's REST service native methods
 */
export interface EventsServiceInterface {
    /*
        Getting a list of events registered in the same transaction by a user
    */
    getEventsByUserAndDate(event : any): Promise<any | any[]>;

    /*
        Getting a list of events group by 'created_at'
    */
   getEventsGroupByCreatedAt(): Promise<any | any[]> 
   
}

