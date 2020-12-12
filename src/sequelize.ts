import { Sequelize } from 'sequelize';
import { Application } from './declarations';

export default function (app: Application): void {
  const connectionString = app.get('postgres');
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: console.log,
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args): Application {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });

    // Sync to the database
    /*
    app.set('sequelizeSync', sequelize.sync().then(() => {
      console.log("Re-sync db whithout droping tables");
    }));
    */
    //database sync for dev context (droping tables)
    
    sequelize.sync({ force: true }).then(() => {
      console.log("Drop and re-sync db.");
    });
    
    return result;

  };
}
