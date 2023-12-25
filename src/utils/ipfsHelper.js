import axios from 'axios';

export async function fetchIpfsMetaData(hash) {
  try {
    return await axios.get(`https://cloudflare-ipfs.com/ipfs/${hash}/metadata.json`);
  } catch (errors) {
    console.error(errors);
    return 'todoItems';
  }
}

export function getHashAndMeta(ipfUrl) {
  return {
    hash: ipfUrl.substring(ipfUrl.indexOf('/') + 2, ipfUrl.lastIndexOf('/')),
    metaData: ipfUrl
      .substring(ipfUrl.indexOf('/') + 2)
      .substring(ipfUrl.substring(ipfUrl.indexOf('/') + 2).indexOf('/') + 1),
  };
}
