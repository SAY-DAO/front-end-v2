import contents from './Contents';

export default function validatePassword(password, repeatPassword) {
  let result;
  if (password !== repeatPassword) {
    result = {
      errorMessage: contents.passwordMatch,
    };
  }
  return result;
}
