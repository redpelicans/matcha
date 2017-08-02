const validate = values => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = 'Required';
  } else if (!/^[A-Za-z ]{2,30}$/.test(values.firstname)) {
    errors.firstname = 'Name should only contains alaphabet and space';
  }
  if (!values.lastname) {
    errors.lastname = 'Required';
  } else if (!/^[A-Za-z ]{2,30}$/.test(values.lastname)) {
    errors.lastname = 'Name should only contains alaphabet and space';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.sexe) {
    errors.sexe = 'Required';
  }
  if (!values.age) {
    errors.age = 'Required';
  } else if (values.age < 18 || values.age > 99) {
    errors.age = 'Age shloud be between 18 and 99 years old';
  }
  if (!values.login) {
    errors.login = 'Required';
  } else if (!/^[A-Za-z0-9]{3,30}$/.test(values.login)) {
    errors.login = 'Login should only contains alpha or num be 30 length max';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (!/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/.test(values.password)) {
    errors.password = 'Password should contain at least one char and one num, be 6 length min';
  }
  return errors;
};

export default validate;
