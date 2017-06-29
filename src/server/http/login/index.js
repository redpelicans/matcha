import bcrypt from 'bcrypt-as-promised';
import jwt from 'jsonwebtoken';
import R from 'ramda';

const login = ({ config: { secretSentence, expiresIn }, models: { users } }) => (req, res, next) => {
  const { login, password } = req.body;
//  const parser = validator(req.body);
//  if (parser) return next({ status: 202, ...parser });
  users.getByEmail(login)
  .then((user) => {
    if (!user || !user.confirmed) return next({ status: 203 });
    return bcrypt.compare(password, user.password).then(() => {
      const token = jwt.sign({ sub: user.id }, secretSentence, { expiresIn });
      res.cookie('matchaToken', token, { httpOnly: true });
      res.json(user);
      users.emit('login', user);
      return user;
    });
  })
  .catch(() => next({ status: 201 }));
};

export default login;
