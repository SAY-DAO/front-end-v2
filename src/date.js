import JDate from 'jalali-date';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function enDate(date) {
  return new Date(date).toLocaleDateString('en-US', options);
}

function faDate(date) {
  return new JDate(new Date(date)).format('dddd D MMMM YYYY');
}

export { enDate, faDate };
