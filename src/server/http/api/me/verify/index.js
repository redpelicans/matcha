import users from '../../../../models/users';

const verify = (req, res, next) => {
  const { id, user } = req.decoded;
  if (!req.decoded) return next({ status: 201, msg: 'failed to verify' });
  users
    .load({ type: 'login', value: user, show: ['confirmed'] })
    .then((data) => {
      if (data.confirmed) return next({ status: 201, msg: 'Already confirmed' });
      return users.update({ confirmed: true }, id);
    })
    .then(resp => {
      if (!resp || !resp.rowCount) return next({ status: 201, msg: 'Already confirmed' });
      res.json({ status: 200, msg: 'Now Confirmed' });
    });
};

export default verify;
