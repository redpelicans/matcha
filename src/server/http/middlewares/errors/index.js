const errors = () => (err, req, res, next) => {
  if (!err) next();
  console.error(err); // eslint-disable-line no-console
  res
    .status(500)
    .json({ error: err.toString() });
};

export default errors;
