// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

// A personnalized Model for the assiociation table inside of automatically generating it by Sequelize
// resulting from the Many to Many relation between Users and Consent tables
// I manually define foreign keys and define a 'unique' constraint on 3 fields to ensure unicity of every user's event stored in this table. 
export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const events = sequelizeClient.define('events', {
    //The event row id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },    
    // I manually create the 'Foreign Key' (look at associations), since I would like to personalize it 
    userUuid: {
      type: DataTypes.UUID,
      unique: 'eventUnicityConstraint',
      allowNull: false
    },
    // A personalized name for the 'unique' constraint so that a notification 'Event' should always be unique in this association table 
    // This labelled unicity constraint will be for theses 4 fields : uuid, consent decision, consent id and event creation date     
    //Example of consent label : sms_notifications, email_notifications
    consentLabel: {
      type: DataTypes.STRING,
      allowNull: false,
      // A constraint unicity on these couple of filed in the table : id and enabled
      unique: 'eventUnicityConstraint',
      validate: {
        isIn: {
          args: [['email_notifications', 'sms_notifications']],
          msg: 'Must be \'email_notifications\' or \'sms_notifications\''
        },
        notNull: {
          msg: 'A consent id is mandatory'
        }
      }
    },
    //Decision on a consent, e.g : bolean "true or false" (on postrgres), tinyint "0 or 1" on mysql
    consentDecision: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: 'eventUnicityConstraint',
      validate: {
        notNull: {
          msg: 'A decision must be taken reltive to a consent'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: 'eventUnicityConstraint',
      validate: {
        notNull: {
          msg: 'The date of the event is mandatory'
        }
      }
    }    
  }, {
    //Sequelize will not automatically generate the fields 'createdAt' and 'updatedAt' for this table
    timestamps: false, 
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
      /*,
      afterBulkCreate: function ( options: any, queryOptions: any ): HookReturn {
        queryOptions = typeof queryOptions === 'object' && queryOptions || {};
        queryOptions.raw = true;
        return this.findAll( options, queryOptions );
      }
      */
    }
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (events as any).associate = function (models: any): void {
    // Defining associations 
    events.belongsTo(sequelizeClient.models.users, {
      targetKey: 'uuid'
    });

  };
 
  return events;
}
