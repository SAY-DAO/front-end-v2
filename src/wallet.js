import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { createPublicClient, webSocket } from 'viem';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    // jsonRpcProvider({
    //   rpc: () => ({
    //     webSocket: `wss://eth.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/mainnet/`,
    //   }),
    // }),
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY, stallTimeout: 8000 }),
    publicProvider({ stallTimeout: 1_000 }), // The publicProvider configures the chains with a public RPC URL.
  ],
);

// Set up client
export const config = (country) => {
  return createConfig({
    autoConnect: false,
    connectors:
      !country || country === 'IR'
        ? [new MetaMaskConnector({ chains })]
        : [
            new MetaMaskConnector({ chains }),
            new WalletConnectConnector({
              chains,
              options: {
                projectId: process.env.REACT_APP_WC_PROJECT_ID,
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

    // webSocketPublicClient,
  });
};
