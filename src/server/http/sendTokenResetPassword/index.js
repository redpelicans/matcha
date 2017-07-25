import jwt from 'jsonwebtoken';
import mailer from '../mailer';

const generateOneTimeToken = ({ config: { routes: { resetPassword } }, models: { users } }) => (req, res, next) => {
  const { email } = req.query;
  users.getByEmailVerif(email).then((user) => {
    if (!user) return next({ status: 201 });
    const token = jwt.sign({ sub: user.id }, user.password);
    mailer(user.email,
      'Reset Password - Matcha',
      `Registration Code: http://127.0.0.1:3001/auth/${resetPassword}?matchaToken=${token}`);
  }).catch(() => next({ status: 201 }));
};

export default generateOneTimeToken;
