import contents from './Contents';

export default function validatePassword(password) {
  let result;
  if (password !== '' && password.length < 6) {
    result = {
      errorMessage: contents.wrongPassword,
    };
  }
  return result;
}
