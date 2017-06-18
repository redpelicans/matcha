import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import users from '../../../../models/users';
import { register as validator } from '../../../validators';
import mailer from '../../../mailer';
import { secretSentence } from '../../../../../../etc/secret';

// const getUrl = server => `http://${server.address().address}:${server.address().port}`;

const register = (req, res, next) => {
  const parser = validator(req.body);
  if (parser) return next({ status: 201, ...parser });
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
        req.body.password = hash;
        return users.add(req.body).then((data) => {
          const { id } = data.rows[0];
          res.json({ status: 200, msg: 'user is now register' });
          const token = jwt.sign({ data: { name: req.body.login, id } }, secretSentence, { expiresIn: '10d' });
          mailer(req.body.email, 'Registration - Matcha', `Registration Code: ${req.connection.server.url}/api/me/verify?token=${token}`);
          next();
        }).catch(() => next({ status: 203, msg: 'users already exists.' }));
      })
      .catch(() => next({ status: 203, msg: 'failed to hash pass' }));
};

export default register;
