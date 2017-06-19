import jwt from 'jsonwebtoken';
import users from '../../../models/users';
import mailer from '../../mailer';

const generateOneTimeToken = (req, res, next) => {
  const { email } = req.query;
  console.log(email);
  users.getByEmail(email).then((user) => {
    if (!user) return next({ status: 201 });
    const token = jwt.sign({ id: user.id }, user.password);
    mailer(user.email,
      'Reset Password - Matcha',
      `Registration Code: ${req.connection.server.url}/api/users/reset_password?token=${token}`);
  }).catch(() => next({ status: 201 }));// eslint-disable-line
};

export default generateOneTimeToken;
