import pgp from 'pg-promise';

const pgConnector = pgp();

const connect = ({ postgres: config }) => {
  const db = pgConnector(config);
  return db.connect()
  .then(client => client);
};

const init = (ctx) => connect(ctx.config)
    .then(client => ({ ...ctx, db: client }));
    
export default init;
