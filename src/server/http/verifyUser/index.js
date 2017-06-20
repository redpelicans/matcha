import R from 'ramda';
import users from '../../../../models/users';

const verify = (req, res, next) => {
  if (!req.userId) return next({ status: 201 });
  users
    .load(req.userId)
    .then((user) => {
      if (user.confirmed) return next({ status: 201 });
      users.update({ confirmed: true }, req.userId)
           .then(updatedUser => res.json(R.omit('password', updatedUser)))
           .catch(() => next({ status: 201 }));
    }).catch(() => next({ status: 201 }));
};

export default verify;
