export default function validateEmail(email) {
  if (email.length > 0 || (email.indexOf('@') > 0 && email.indexOf('.') > 0)) {
    return true;
  }
  return false;
}
