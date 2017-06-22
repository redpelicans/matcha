const getToken = (req, res, next) => {
  const token = req.cookies.matchaToken || req.query.matchaToken;
  req.token = token;
  next();
};

export default getToken;
