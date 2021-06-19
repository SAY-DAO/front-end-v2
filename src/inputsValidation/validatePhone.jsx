import contents from './Contents';

export default function validatePhone(phoneNumber, countryCode) {
  let result;

  if (countryCode === 'ir' && !phoneNumber.length === 16) {
    result = {
      errorMessage: contents.wrongPhone,
    };
  }

  if (phoneNumber.length > 4 && phoneNumber.length < 16) {
    result = {
      errorMessage: contents.wrongPhone,
    };
  }
  return result;
}
