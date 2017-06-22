const getToken = (req, res, next) => {
  const token = req.cookies.matchaToken || req.query.matchaToken;
  req.matchaToken = token;
  next();
};

export default getToken;
