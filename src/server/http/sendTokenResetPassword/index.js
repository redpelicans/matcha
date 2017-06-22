import jwt from 'jsonwebtoken';
import mailer from '../mailer';

const generateOneTimeToken = ({ config: { routes: { resetPassword } }, models: { users } }) => (req, res, next) => {
  const { email } = req.query;
  users.getByEmail(email).then((user) => {
    if (!user) return next({ status: 201 });
    const token = jwt.sign({ sub: user.id }, user.password);
    mailer(user.email,
      'Reset Password - Matcha',
      `Registration Code: ${req.connection.server.url}/${resetPassword}?token=${token}`);
  }).catch(() => next({ status: 201 }));
};

export default generateOneTimeToken;
