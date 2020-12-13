// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { Users } from '../services/users/users.class';

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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      // A personalized name for the 'unique' constraint so that a notification 'Event' should always be unique in this association table 
      // This labelled unicity constraint will be for theses 3 fields : the user's uuid, the consent Id, the event creation date
      unique: 'eventUnicityConstraint',
      validate: {
        notNull: {
          msg: 'The date of the event is mandatory'
        }
      }
    },
    // I manually create the Foreign Key, since I would like personnlize it with a 'unique' constraint
    userUuid: {
      type: DataTypes.UUID,
      unique: 'eventUnicityConstraint',
      allowNull: false
    },
    //eg : sms_notifications, email_notifications
    consentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'eventUnicityConstraint'
    }
  }, {
    // We don't want Sequelize to generated these two fields : createdAt and updatedAt
    // since the consent event will never be Updated and the createdAt is comming from the request as recommended by the exercice
    timestamps: false,
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
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
