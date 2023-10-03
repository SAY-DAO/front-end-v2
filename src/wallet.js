// /* eslint-disable no-unused-vars */
import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { createPublicClient, http } from 'viem';
// import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
// import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
// import { getDefaultConfig } from 'connectkit';
// import { PhantomConnector } from 'phantom-wagmi-connector';
import '@rainbow-me/rainbowkit/styles.css';
// import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createPublicClient, webSocket } from 'viem';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    // jsonRpcProvider({
    //   rpc: () => ({
    //     http: `https://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet/`,
    //   }),
    // }),
    // alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY, stallTimeout: 1_000 }),
    publicProvider(),
  ],
);

// const { connectors } = getDefaultWallets({
//   appName: 'SAY DAO',
//   projectId: process.env.REACT_APP_WC_PROJECT_ID,
//   chains,
// });
// Set up client
export const config = createConfig({
  autoConnect: false,
  connectors:
   [
    new MetaMaskConnector({ chains }),

    new WalletConnectConnector({
      chains,
      options: {
        relayUrl: `wss://relay.walletconnect.com`,
        projectId: process.env.REACT_APP_WC_PROJECT_ID,
      },
    }),
  ],
  publicClient: createPublicClient({
    batch: {
      multicall: true,
    },
    // transport: http(),
    transport: webSocket(`wss://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet/`),
    chain: mainnet,
  }),
});
