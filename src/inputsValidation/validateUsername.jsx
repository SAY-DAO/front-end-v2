import contents from './Contents';

export default function validateUsername(username) {
  const valid = /^[A-Za-z0-9][.A-Za-z0-9]{3,11}$/;
  const invalidStart = /^[.]/;
  const validLength = /^.{4,12}$/;
  let result = '';

  if (username !== '') {
    if (!username.match(valid)) {
      if (username.match(invalidStart)) {
        // 1. start
        result = {
          errorMessage: contents.usernameStart,
        };
      } else if (!username.match(validLength)) {
        // 2. length
        result = {
          errorMessage: contents.usernameLength,
        };
      } else if (!username.match(valid)) {
        // 3. valid
        result = {
          errorMessage: contents.wrongUsername,
        };
      }
      return result;
    }
  }
  return { errorMessage: '', erUsername: '' };
}
