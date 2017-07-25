import jwt from 'jsonwebtoken';
import users from '../../../models/users';

const getUserFromToken = (config) => (req, res, next) => {
  const { matchaToken } = req;
  const { secretSentence } = config;
  if (!matchaToken) return next();
  const dataDecoded = jwt.verify(matchaToken, secretSentence);
  if (!dataDecoded) return next();
  return users.load(dataDecoded.sub)
    .then(user => {
      req.user = user;
      return next();
    })
    .catch(err => next(err));
};

export default getUserFromToken;
