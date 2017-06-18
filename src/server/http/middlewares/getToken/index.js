const getToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization || req.query.token;
  req.token = token;
  next();
};

export default getToken;
