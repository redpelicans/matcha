import users from '../../../../models/users';

const verify = (req, res, next) => {
  const { id, name } = req.decoded;
  users.load({ type: 'login', value: name, show: ['confirmed'] })
    .then(data => {
      if (data.confirmed) return next({ status: 201, msg: 'Already confirmed' });
      return users.update({ confirmed: true }, id);
    })
    .then(resp => {
      if (!resp || !resp.rowCount) return next({ status: 201, msg: 'Failed to verify' });
      res.json({ status: 200, msg: 'Now Confirmed' });
      next();
    })
    .catch(() => next({ status: 201, msg: 'Failed to verify' }));
};

export default verify;
