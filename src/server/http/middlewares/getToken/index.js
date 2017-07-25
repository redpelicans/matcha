const getToken = () => (req, res, next) => {
  const { matchaToken: token } = req.query;
  const { matchaToken } = req.body;
  req.matchaToken = matchaToken || token;
  next();
};

export default getToken;
