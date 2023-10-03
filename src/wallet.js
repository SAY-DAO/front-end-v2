import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { createPublicClient, webSocket } from 'viem';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

export const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet/`,
      }),
    }),
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY, stallTimeout: 1_000 }),
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
        // relayUrl: `wss://relay.walletconnect.org`,
        projectId: process.env.REACT_APP_WC_PROJECT_ID,
      },
    }),
  ],
  publicClient: createPublicClient({
    chain: mainnet,
    // batch: {
    //   multicall: true,
    // },
    // transport: http(),
    transport: webSocket(`wss://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet`, {
      retryCount: 5,
    }),
  }),
});
