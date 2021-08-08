import contents from './Contents';

export default function validateUsername(userName) {
  const valid = /^[A-Za-z0-9][.A-Za-z0-9]{5,15}$/;
  const invalidStart = /^[.,?,!,&,%,@,#,*,(,),~,|,0,1,2,3,4,5,6,7,8,9]/;
  const validLength = /^.{6,16}$/;
  let result = '';

  if (userName) {
    // 1. start
    if (userName.match(invalidStart)) {
      return (result = {
        errorMessage: contents.usernameStart,
      });
      // 3. length
    }
    if (!userName.match(validLength)) {
      return (result = {
        errorMessage: contents.usernameLength,
      });
      // 4. valid
    }
    if (!userName.match(valid)) {
      return (result = {
        errorMessage: contents.wrongUsername,
      });
    }
    return result;
  }
  return { errorMessage: '', erUsername: '' };
}
