export default function validatePhone(phoneNumber, countryCode) {
  if (phoneNumber.length === 16 && countryCode === 'ir') {
    return true;
  }
  return false;
}
