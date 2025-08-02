const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function enDate(date) {
  return new Date(date).toLocaleDateString('en-US', options);
}

function faDate(date) {
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export { enDate, faDate };
