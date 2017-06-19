 import bcrypt from 'bcrypt';
 import jwt from 'jsonwebtoken';
 import R from 'ramda';
 import { login as validator } from '../validators';
 import users from '../../models/users';

 const getConnected = ({ secretSentence, expiresIn }) => (req, res, next) => {
   const { email, password } = req.body;
   const parser = validator(req.body);
   if (parser) return next({ status: 202, ...parser });
   users.getByEmail(email)
    .then((user) => {
      if (!user || !user.confirmed) return next({ status: 203 });
      if (!bcrypt.compareSync(password, user.password)) return next({ status: 201 });
      const token = jwt.sign({ sub: user.id }, secretSentence, { expiresIn });
      res.cookie('matchaToken', token, { httpOnly: true });
      res.json(R.omit('password', user));
      return user;
    })
    .catch(() => next({ status: 201 }));
 };

 export default getConnected;

// 201 NOT FOUND
// 202 WRONG type
// 203 ALREADY
