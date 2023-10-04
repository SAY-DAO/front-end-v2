import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { createPublicClient, webSocket } from 'viem';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    // jsonRpcProvider({
    //   rpc: () => ({
    //     http: `wss://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet/`,
    //   }),
    // }),
    // alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY, stallTimeout: 8000 }),
    publicProvider(),
  ],
);

// Set up client
export const config = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.REACT_APP_WC_PROJECT_ID,
        isNewChainsStale: false,
      },
    }),
  ],
  publicClient: createPublicClient({
    // batch: {
    //   multicall: true,
    // },
    // transport: webSocket(`wss://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet/`),
    transport: webSocket(`wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_KEY}`),
    chain: mainnet,
  }),

  webSocketPublicClient,
});
