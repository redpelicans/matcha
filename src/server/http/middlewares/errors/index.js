const errors = () => (err, req, res, next) => {
  if (!err) next();
  if (process.env.NODE_ENV === 'testing') return res.status(200).json({ error: 'Unauthorized' }); // axios handling erros
  if (err.name === 'error') return res.status(201).json({ error: 'Unauthorized' });
  res.status(err.status);
  if (err.status === 202) res.json({ error: 'Bad request' });
  if (err.status === 201) res.json({ error: 'Unauthorized' });
  if (err.status === 306) res.json({ error: 'Errors' });
};

export default errors;
