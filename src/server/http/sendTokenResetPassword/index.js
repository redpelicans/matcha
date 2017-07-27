import jwt from 'jsonwebtoken';
import mailer from '../mailer';

const generateOneTimeToken = ({ config: { routes: { resetPassword } }, models: { users } }) => async ctx => {
  const { email } = ctx.query;
  try {
    const user = await users.getByEmailVerif(email);
    const token = jwt.sign({ sub: user.id }, user.password);
    mailer(user.email,
    'Reset Password - Matcha',
    `Registration Code: http://127.0.0.1:3001/auth/${resetPassword}?matchaToken=${token}`);
    ctx.body = 'Email sent';
  } catch (err) {
    ctx.status = err.status || 201;
    ctx.body = 'Failed to authenticate';
  }
};

export default generateOneTimeToken;
