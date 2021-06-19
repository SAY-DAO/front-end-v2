import contents from './Contents';

export default function validateEmail(email) {
  let result;
  if (
    !(email.length > 0) ||
    !(email.indexOf('@') > 0) ||
    !(email.indexOf('.') > 0)
  ) {
    result = {
      errorMessage: contents.wrongEmail,
    };
  }
  // correct email
  if (email.length > 0 && email.indexOf('@') > 0 && email.indexOf('.') > 0) {
    result = '';
  }

  return result;
}
