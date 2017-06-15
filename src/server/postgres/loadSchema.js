const queryDrop = 'DROP TABLE IF EXISTS users';

const query = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  login VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE
);
`;

const loadSchema = ({ db }) => db.query(query).then(() => db);

export default loadSchema;
