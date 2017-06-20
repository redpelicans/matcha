const errors = () => (err, req, res, next) => {
  // console.error(err); // eslint-disable-line no-console
  if (!err) next();
  if (!err.status) return res.status(201).json({ error: err.message });
  res.status(err.status).json({ error: err.msg });
};

export default errors;
