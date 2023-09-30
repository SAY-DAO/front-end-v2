import { createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { createPublicClient, http } from 'viem';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { InjectedConnector } from 'wagmi/connectors/injected'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://blue-green-borough.discover.quiknode.pro/e1f6c0a3a5bd822bcb8908b1420d80e51c679b07/" // 👈 Replace this with your HTTP URL from the previous step
      }),
    }),
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY, stallTimeout: 1_000 }),
    publicProvider(),
  ],
);

// Set up client
export const config = createConfig(
  {
    autoConnect: false,
    connectors: [
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
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
      transport: http(),
      // transport: webSocket(`wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_KEY}`),
      chain: mainnet,
    }),
    webSocketPublicClient,
  },
);
