import jwt from 'jsonwebtoken';
import users from '../../../models/users';
import mailer from '../../mailer';

const generateOneTimeToken = (req, res, next) => {
  const { email } = req.query;
  const data = { type: 'email', value: email, show: ['password', 'email', 'id'] };
  users.load(data).then((resp) => {
    console.log(resp); // eslint-disable-line
    if (!resp) return next({ status: 201, msg: 'Accont not found' });
    const token = jwt.sign({ data: { email: resp.email, id: resp.id } }, resp.password, { expiresIn: '10d' });
    mailer(resp.email, 'Reset Password - Matcha', `Registration Code: ${req.connection.server.url}/api/me/reset_password?token=${token}`);
    next();
  }).catch(console.log); // eslint-disable-line
};

export default generateOneTimeToken;
