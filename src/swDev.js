export default function swDev() {
    let swUrl= `${process.env.PUBLIC_URL}/serviceworker.js`
    if('serviceWorker' in navigator) {

          navigator.serviceWorker.register(swUrl)
          .then((reg) => console.log('success: ' ,reg.scope))
          .catch((err) => console.log('Failiure: ', err))
      }
}