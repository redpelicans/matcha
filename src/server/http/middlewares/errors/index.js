const errors = () => (err, req, res, next) => {
  if (!err) next();
  if (!err.status && !err.detail) return res.status(201).json({ status: 'failed to authenticate' });
  if (!err.status) res.json(err.detail);
  res.status(err.status).end();
};

export default errors;
