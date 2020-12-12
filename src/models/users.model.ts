// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { generateUserUUIDv1 } from '../utils/didomi.jstools';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }, 
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      validate: {
        isUUID: 1
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
        name : 'userUUID',
        allowNull: false
      },    
      through: { 
        model : sequelizeClient.models.events, 
        //we prevent creating unicity of the couple (uuid, consentId) into the association table 
        unique: false 
      }
    });
  
    users.hasMany(sequelizeClient.models.events, {
      as : 'userEvents',
      sourceKey: 'id',
      foreignKey: {
        name : 'userId',
        allowNull: false
      }
    });
    
  };
  

  return users;
}
