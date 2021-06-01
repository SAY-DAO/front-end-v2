/* eslint-disable no-undef */
export default function swDev() {
  console.log('initiating service worker...');
  const swUrl = `${process.env.PUBLIC_URL}/serviceworker.js`;
  console.log(`swurl = ${swUrl}`);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(swUrl)
      .then((reg) => console.log('success: ', reg.scope))
      .catch((err) => console.log('Failiure: ', err));
  }
}
