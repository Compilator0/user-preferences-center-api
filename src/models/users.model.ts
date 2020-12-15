// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

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
  (users as any).associate = function (): void {
    // Defining associations
    users.hasMany(sequelizeClient.models.events, {
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
