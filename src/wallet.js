import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { createPublicClient, webSocket } from 'viem';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY }), publicProvider()],
);

// Set up client
export const config = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        relayUrl: `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_KEY}`,
        projectId: process.env.REACT_APP_WC_PROJECT_ID,
        showQrModal: false,
      },
    }),
  ],
  publicClient: createPublicClient({
    // batch: {
    //   multicall: true,
    // },
    transport: webSocket(`wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_KEY}`),
    chain: mainnet,
  }),
  webSocketPublicClient,
});
