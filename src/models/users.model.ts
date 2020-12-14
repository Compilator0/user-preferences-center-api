// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { generateUserUUIDv1 } from '../utils/didomi.jstools';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        isUUID: 4
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Is not a valid email'
        },
        notNull: {
          msg: 'The email is mandatory'
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
  (users as any).associate = function (models: any): void {
    // Defining associations 
    
    users.belongsToMany(sequelizeClient.models.consent, { 
      sourceKey: 'uuid', 
      targetKey: 'id',
      foreignKey: {
        name : 'uuid',
        allowNull: false
      },    
      through: { 
        model : sequelizeClient.models.events, 
        // I prevent Sequelize from automatically creating the 'unique' constraint on this association table relative to the 2 foreign keys : consent's Id and user Id
        // On the association table called 'Event', I've created a unique constraint for 3 fields inside of 2 fields as Sequelize would have automatically generated
        // The unique constraint on this 'Event' association table will be for theses 3 fileds : the user's uuid, the consentId, event creation date
        unique: false 
      }
    });
  
    users.hasMany(sequelizeClient.models.events, {
      as : 'Events',
      sourceKey: 'uuid',
      foreignKey: {
        name : 'userUuid',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
    
  };
  

  return users;
}
