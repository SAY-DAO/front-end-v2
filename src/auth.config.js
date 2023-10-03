import { ThirdwebAuth } from '@thirdweb-dev/auth/next';
import { PrivateKeyWallet } from '@thirdweb-dev/auth/evm';

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  wallet: new PrivateKeyWallet(process.env.REACT_APP_THIRD_WEB_SECRET || ''),
  domain: 'dapp.saydao.org',
});
