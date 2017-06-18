export const mail = email => !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
export const name = nom => !/^[A-Za-z ]{2,30}$/.test(nom);
export const password = passwd => !/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,}$/.test(passwd);
export const login = username => /\W+/.test(username) || !/^.{5,25}$/.test(username);
