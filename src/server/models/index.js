import pgp from 'pg-promise';

const pgConnector = pgp();
const models = [];

const modelProto = {
  connect(db) {
    this.db = db;
    return this;
  },
  ping() {
    if (!this.db) return Promise.reject(new Error('db is not initialiazed'));
    return this.db.query('SELECT 1');
  },
};

export const connect = ({ postgres: config }) => {
  const db = pgConnector(config);
  return db.connect()
  .then(client => {
    models.forEach(model => model.connect(client));
    return client;
  });
};


export const register = (model) => {
  const dbModel = Object.create(modelProto, Object.getOwnPropertyDescriptors(model));
  models.push(dbModel);
  return dbModel;
};
