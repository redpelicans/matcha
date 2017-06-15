const query = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  login VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE
);
`;

const loadSchema = (ctx) => {
  const { db } = ctx;
  return db.none(query).then(() => ctx);
};

export default loadSchema;
