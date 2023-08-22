import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { createPublicClient, http} from 'viem';

// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }), publicProvider()],
);

// Set up client
export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.REACT_APP_WC_PROJECT_ID,
      },
    }),
  ],
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
  webSocketPublicClient,
});
