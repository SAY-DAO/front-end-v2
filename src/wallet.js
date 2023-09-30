import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { createPublicClient, webSocket } from 'viem';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { getDefaultConfig } from 'connectkit';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY, stallTimeout: 1_000 }),
    publicProvider(),
  ],
);

// Set up client
export const config = createConfig(
  getDefaultConfig({
    appName: 'SAY DAO',
    infuraId: process.env.REACT_APP_INFURA_ID,
    alchemyId: process.env.REACT_APP_ALCHEMY_ID,
    chains,
    walletConnectProjectId: process.env.REACT_APP_WC_PROJECT_ID,
  }),
  {
    autoConnect: false,
    connectors: [
      new MetaMaskConnector({ chains }),
      // new WalletConnectConnector({
      //   chains,
      //   options: {
      //     relayUrl: `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_KEY}`,
      //     projectId: process.env.REACT_APP_WC_PROJECT_ID,
      //     showQrModal: false,
      //   },
      // }),
    ],

    publicClient: createPublicClient({
      // batch: {
      //   multicall: true,
      // },
      // transport: http(),
      transport: webSocket(`wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_KEY}`),
      chain: mainnet,
    }),
    // webSocketPublicClient,
  },
);
