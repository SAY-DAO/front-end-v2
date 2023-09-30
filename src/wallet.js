/* eslint-disable no-unused-vars */
import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { createPublicClient, http, webSocket } from 'viem';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
// import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    // jsonRpcProvider({
    //   rpc: () => ({
    //     http: `wss://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet/`,
    //   }),
    // }),
    // alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY, stallTimeout: 1_000 }),
    publicProvider(),
  ],
);

// Set up client
export const config = createConfig({
  autoConnect: true,
  connectors: [
    // new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        relayUrl: `wss://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet/`,
        projectId: process.env.REACT_APP_WC_PROJECT_ID,
      },
    }),
  ],

  publicClient: createPublicClient({
    // batch: {
    //   multicall: true,
    // },
    // transport: http(),
    transport: webSocket(`wss://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet/`),
    chain: mainnet,
  }),
  webSocketPublicClient,
});
