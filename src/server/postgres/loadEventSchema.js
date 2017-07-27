const query = `CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  to_user NUMERIC NOT NULL,
  from_user NUMERIC NOT NULL,
  date NUMERIC,
  push BOOLEAN DEFAULT FALSE
);`;

const loadSchema = async (ctx) => {
  const { db } = ctx;
  await db.any(query);
  return ctx;
};

export default loadSchema;
