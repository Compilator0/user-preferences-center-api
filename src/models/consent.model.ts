// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import users from './users.model';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const consent = sequelizeClient.define('consent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    //eg : sms_notifications, email_notifications
    consentLabel: {
      type: DataTypes.STRING,
      allowNull: false,
      // A constraint unicity on these couple of filed in the table : id and enabled
      unique: 'consentUnicityConstraint',
      validate: {
        isIn: {
          args: [['email_notifications', 'sms_notifications']],
          msg: "Must be 'email_notifications' or 'sms_notifications'"
        },
        notNull: {
          msg: 'A consent id is mandatory'
        }
      }
    },
    consentDecision: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: 'consentUnicityConstraint',
      validate: {
        notNull: {
          msg: 'A decision must be taken reltive to a consent'
        }
      }
    }
    //2 fileds will be automatically added by sequelize : createdAt and updatedAt  
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (consent as any).associate = function (models: any): void {
    // Defining associations 
    consent.belongsToMany(sequelizeClient.models.users, { 
      sourceKey: 'id', 
      targetKey: 'uuid',
      foreignKey: {
        name : 'consentId',
        allowNull: false
      },
      through: { 
        model : sequelizeClient.models.events, 
        //we prevent creating unicity of the couple (uuid, consentId) into the association table 
        unique: false 
      }
    });
  };

  return consent;
}
