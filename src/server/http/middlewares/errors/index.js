const errors = () => (err, req, res, next) => {
  if (!err) next();
  // if (!err.status) return res.status(201).json({ error: 'err.message' });
  if (err.name === 'error') return res.status(201).json({ error: 'Unauthorized' });
  res.status(err.status);
  if (err.status === 202) res.json({ error: 'Bad request' });
  if (err.status === 201) res.json({ error: 'Unauthorized' });
  if (err.status === 306) res.json({ error: 'Errors' });
};

export default errors;
