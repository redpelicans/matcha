const errors = () => (err, req, res, next) => {
  if (!err) next();
  res.status(err.status).end();
};

export default errors;
