
export function numberConvertor(string) {
  return string
    .replace(/[\u0660-\u0669]/g, (c) => {
      return c.charCodeAt(0) - 0x0660;
    })
    .replace(/[\u06f0-\u06f9]/g, (c) => {
      return c.charCodeAt(0) - 0x06f0;
    });
}

export function dateConvertor(string) {
  const d = new Date(string)
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {dateStyle: 'full'}).format(d)
}

export function persianMonth(date){
  return new Intl.DateTimeFormat('en-US-u-ca-persian', {month: 'short'}).format(date)
}