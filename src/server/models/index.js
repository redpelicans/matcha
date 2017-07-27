import pgp from 'pg-promise';
import EventEmitter from 'events';

const models = {
};

class Proto extends EventEmitter {
  connect(db) {
    this.db = db;
    return this;
  }
  ping() {
    if (!this.db) return Promise.reject(new Error('db is not initialiazed'));
    return this.db.query('SELECT 1');
  }
}

export const connect = async ({ postgres: config, configPgp }) => {
  const pgConnector = pgp(configPgp);
  const db = pgConnector(config);
  const client = await db.connect();
  Object.values(models).forEach(model => model.connect(client));
  return { db: client, models };
};

export const register = (name, model) => {
  const dbModel = Object.create(Proto.prototype, Object.getOwnPropertyDescriptors(model));
  models[name] = dbModel;
  return dbModel;
};
