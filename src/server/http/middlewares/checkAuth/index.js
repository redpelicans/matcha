import jwt from 'jsonwebtoken';

const checkAuth = ({ secretSentence }) => (req, res, next) => {
  const { token } = req;
  jwt.verify(token, secretSentence, (err, decoded) => {
    if (err) return next({ status: 401, msg: 'Unauthorized' });
    req.userId = decoded.sub;
    next();
  });
};

export default checkAuth;
