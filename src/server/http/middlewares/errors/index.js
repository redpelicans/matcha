const errors = () => (err, req, res, next) => {
  if (!err) next();
  console.error('errors middleware'); // eslint-disable-line no-console
  // console.error(err); // eslint-disable-line no-console
  res
    .status(err.status)
    .json({ error: err.msg });
};

export default errors;
