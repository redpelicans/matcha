import users from '../../../../models/users';

const deleteAccount = (req, res, next) => {
  users.delete(req.decoded.id)
      .then((result) => {
        if (!result.rowCount) return next({ status: 201, msg: 'failed to deleted your account' });
        res.cookie('token', '', { httpOnly: true });
        res.json({ status: 200, msg: 'account deleted' });
      });
};

export default deleteAccount;
