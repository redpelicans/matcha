import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import { login as validator } from '../validators';
import users from '../../models/users';
import { secretSentence } from '../../../../etc/secret';

const login = (req, res, next) => {
  const parser = validator(req.body);
  const { login: user, password } = req.body;
  if (parser) return next({ status: 201, ...parser });
  users.load({ type: 'login', value: user, show: ['id', 'password', 'confirmed'] })
    .then((resp) => {
      if (!resp) return next({ status: 201, msg: 'login not found' });
      // if (!resp.confirmed) return next({ status: 201, msg: 'account not confirmed' });
      return bcrypt.compare(password, resp.password).then((bool) => ({ id: resp.id, bool }));
    })
    .then((resp) => {
      if (!resp) return;
      const token = jwt.sign({ data: { user, id: resp.id } }, secretSentence, { expiresIn: '24h' });
      res.cookie('token', token, { httpOnly: true });
      res.json({ status: 200, msg: 'now connected' });
    })
    .catch(() => next({ status: 201, msg: 'failed to authenticate' }));
};

export default login;
