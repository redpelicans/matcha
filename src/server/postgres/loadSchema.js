const query = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  login VARCHAR UNIQUE NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE
);
ALTER SEQUENCE users_id_seq RESTART WITH 1;
`;

const loadSchema = (ctx) => {
  const { db } = ctx;
  return db.none(query).then(() => ctx);
};

export default loadSchema;
