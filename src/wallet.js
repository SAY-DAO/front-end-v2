import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { createPublicClient, webSocket } from 'viem';
// import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet';


export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY }), publicProvider()],
);

// Set up client
export const config = createConfig({
  autoConnect: true,
  connectors: [
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'SAY DAO',
    //     jsonRpcUrl: `https://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_KEY}`,
    //   },
    // }),
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        relayUrl: `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_KEY}`,
        projectId: process.env.REACT_APP_WC_PROJECT_ID,
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
