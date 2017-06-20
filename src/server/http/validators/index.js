import * as parser from './parsers';

export const register = (data) => {
  const res = { msg: '' };
  if (parser.mail(data.email)) res.msg = 'Wrong email format';
  else if (parser.password(data.password)) res.msg = 'Wrong password format';
  else if (parser.login(data.login)) res.msg = 'Wrong login format';
  else if (parser.name(data.firstname)) res.msg = 'Wrong firstname format';
  else if (parser.name(data.lastname)) res.msg = 'Wrong lastname format';
  else if (data.login === data.password) res.msg = 'Login and password cannot identical';
  else return false;
  return res;
};

export const login = (data) => {
  const res = { msg: '' };
  if (parser.password(data.password)) res.msg = 'Wrong password format';
  else if (parser.login(data.login)) res.msg = 'Wrong email format';
  else return false;
  return res;
};

export const parse = (data) => {
  if (data.email) return parser.mail(data.email);
  if (data.password) return parser.password(data.email);
  if (data.login) return parser.login(data.email);
  if (data.firstname || data.lastname) return parser.name(data.email);
  return false;
};
