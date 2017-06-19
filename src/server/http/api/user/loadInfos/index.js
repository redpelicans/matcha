import R from 'ramda';
import users from '../../../../models/users';

const loadInfos = (req, res, next) => {
  users
    .load(req.userId)
    .then((user) => {
      if (!user) return next({ status: 201 });
      res.json(R.omit('password', user));
    })
    .catch(() => next({ status: 201 }));
};

export default loadInfos;
