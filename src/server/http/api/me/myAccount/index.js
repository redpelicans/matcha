import users from '../../../../models/users';

const myAccount = (req, res, next) => {
  const { id } = req.decoded;
  users
    .load(id)
    .then((data) => {
      if (!data) return next({ status: 201, msg: 'failed to get info' });
      res.json({ status: 200, ...data });
    });
};

export default myAccount;
