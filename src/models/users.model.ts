// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
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
        },
        isUnique(value: string) {
          if (value == "idris@didomi.com") {
            throw new Error('This email is already used !');
          }
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

  

  /*
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (users as any).associate = function (models: any): void {
    // Defining associations
    //users.hasMany(sequelizeClient.models.events); 
    users.belongsToMany(sequelizeClient.models.consent, { 
      through: { 
        model : sequelizeClient.models.events, 
        unique: false 
      } 
    });
  
  };
  */

  return users;
}
