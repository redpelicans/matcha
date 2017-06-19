import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../../../../models/users';
import { register as validator } from '../../../validators';
import mailer from '../../../mailer';
// const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const register = ({ secretSentence, expiresIn }) => (req, res, next) => {
  const parser = validator(req.body);
  if (validator(req.body)) return next({ status: 202, ...parser });
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  users
    .add(req.body)
    .then((user) => {
      const { id } = user.rows[0];
      const token = jwt.sign({ sub: id }, secretSentence, { expiresIn });
      mailer(
        req.body.email,
        'Registration - Matcha',
        `Registration Code: ${req.connection.server.url}/api/users/verify?token=${token}`);
      res.status(200).end();
    }).catch(() => next({ status: 203, msg: 'users already exists.' }));
};

export default register;
