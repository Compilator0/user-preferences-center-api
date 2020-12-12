// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
import { Users } from '../services/users/users.class';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const events = sequelizeClient.define('events', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    eventCreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The date of the event is mandatory'
        }
      }
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
      targetKey: 'id'
    });

  };
  
 
  return events;
}
