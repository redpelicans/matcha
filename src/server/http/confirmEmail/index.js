import R from 'ramda';
import users from '../../models/users';

const confirmEmail = () => (req, res, next) => {
  const { id } = req.user;
  return users.update({ confirmed: true }, Number(id)).then(user => {
    res.json(R.omit('password', user));
  });
};

export default confirmEmail;
