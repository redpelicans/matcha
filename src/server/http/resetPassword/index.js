import users from '../../models/users';

const resetPassword = (req, res) => {
  const { password } = req.body;
  // if (parser(password)) return next({ status: 202 });
  users.update({ password }, req.id)
       .then(res.status(200).end());
};

export default resetPassword;