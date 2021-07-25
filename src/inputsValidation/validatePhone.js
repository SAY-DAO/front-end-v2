import contents from './Contents';

export default function validatePhone(phoneNumber, countryCode) {
  let result;
  if (countryCode === 'ir' && phoneNumber.length < 16) {
    result = {
      errorMessage: contents.wrongPhone,
    };
  }
  // Correct phone number
  if (countryCode === 'ir' && phoneNumber.length === 16) {
    result = '';
  }
  return result;
}
