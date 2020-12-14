import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import app from '../../app';
import { Application } from '../../declarations';
import { ConsentServiceInterface } from './consent.service.interface';


export class Consent extends Service  implements ConsentServiceInterface {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  /*
    Returning the data of a Consent, using the consent model inside of using the consent service default REST methods,
    because we don't want them to trigger the pre and post Hooks methods of consent service
  */
  async getConsentFromLabelAndDecision(consentLabel: string, consentDecision: string) {
    // Getting the consent Model
    const ConsentModel = app.get('sequelizeClient').models.consent;
    return (await ConsentModel.findOne({
      where: { 
        consent_label: consentLabel,
        consent_decision: consentDecision
      }
    })).toJSON();
  } 

  //end of class
}

