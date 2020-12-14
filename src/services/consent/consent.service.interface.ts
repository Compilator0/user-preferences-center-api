
/**
 *  An interface listing all custom functions that can profit instances of Consent class 
 *  in addition to the consent's REST service native methods
 */
export interface ConsentServiceInterface {

    /*
        Returning the data of a Consent, using the consent model.
        The consent to return must match the 2 criteria passed as parameters
    */
    getConsentFromLabelAndDecision(consentLabel: string, consentDecision: string) : Object;

}

