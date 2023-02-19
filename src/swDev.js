/* eslint-disable no-undef */
export default function swDev() {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(swUrl)
      .then((reg) => console.log('success: ', reg))
      .catch((err) => console.log('Failiure: ', err));
  }
}
