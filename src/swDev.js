export default function swDev() {
  console.log('initiating service worker...');
  const swUrl = `${process.env.PUBLIC_URL}/serviceworker.js`;
  console.log(`swurl = ${swUrl}`);
  console.log(`swurl = ${process.env.PUBLIC_URL}`);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(swUrl)
      .then((reg) => console.log('Success: ', reg.scope))
      .catch((err) => console.log('Failure: ', err));
  }
}
