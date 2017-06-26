const errors = () => (err, req, res, next) => {
  if (!err) next();
  console.log(err);
  if (!err.status) res.status(201).end(); // testing
  res.status(err.status).end();
};

export default errors;
