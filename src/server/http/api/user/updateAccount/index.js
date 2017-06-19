import users from '../../../../models/users';
import { parse } from '../../../validators';

const updateAccount = (req, res, next) => {
  if (!parse(req.body)) next({ status: 201, msg: 'wrong data format' });
  users
    .update(req.body, req.decoded.id)
    .then(res.json({ status: 200, msg: 'info updated' }))
    .catch(next({ status: 201, msg: 'failed to update ' }));
};

export default updateAccount;
