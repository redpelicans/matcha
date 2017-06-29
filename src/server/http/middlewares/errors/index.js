const errors = () => (err, req, res, next) => {
  if (!err) next();
  if (!err.status) res.json(err.detail);
  res.status(err.status).end();
};

export default errors;
