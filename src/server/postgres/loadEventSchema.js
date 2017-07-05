const query = `CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  to_user NUMERIC NOT NULL,
  from_user NUMERIC NOT NULL,
  date NUMERIC,
  push BOOLEAN DEFAULT FALSE
);`;

const loadSchema = (ctx) => {
  const { db } = ctx;
  return db.any(query).then(() => ctx);
};

export default loadSchema;
