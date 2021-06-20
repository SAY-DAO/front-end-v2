import contents from './Contents';

export default function validateUsername(userName) {
  const valid = /^[A-Za-z0-9][.A-Za-z0-9]{3,11}$/;
  const invalidStart = /^[.]/;
  const validLength = /^.{4,12}$/;
  let result = '';

  if (!userName.match(valid)) {
    if (userName.match(invalidStart)) {
      // 1. start
      result = {
        errorMessage: contents.usernameStart,
      };
    } else if (!userName.match(validLength)) {
      // 2. length
      result = {
        errorMessage: contents.usernameLength,
      };
    } else if (!userName.match(valid)) {
      // 3. valid
      result = {
        errorMessage: contents.wrongUsername,
      };
    }
    return result;
  }
  return { errorMessage: '', erUsername: '' };
}
