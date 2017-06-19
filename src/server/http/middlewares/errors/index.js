const errors = () => (err, req, res, next) => {
  if (!err) next();
  console.log('middlewares-Error');
  console.error(err); // eslint-disable-line no-console
  res
    .status(err.status)
    .json({ error: err.msg });
};

export default errors;
