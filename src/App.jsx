/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { WagmiConfig } from 'wagmi';
import { ThirdwebProvider, ThirdwebSDKProvider } from '@thirdweb-dev/react';
import { ConnectButton, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Router from './routes/Router';
import ThemeSettings from './layouts/customizer/ThemeSettings';
import { chains, config } from './wallet';
import RTL from './layouts/customizer/RTL';

function App() {
  const routing = useRoutes(Router);
  const themOptions = useSelector((state) => state.themOptions);
  // const { user } = useUser();

  // Configure JSS for RTL
  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  // Create rtl cache for RTL
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });
  const theTheme = ThemeSettings();

  // const { data: signer } = useSigner();

  return (
    <CacheProvider value={cacheRtl}>
      <StylesProvider jss={jss}>
        <div id="direction" dir="">
          <CssBaseline />
          <Container
            sx={{
              margin: 'auto',
              paddingLeft: '0px !important',
              paddingRight: '0px !important',
            }}
            maxWidth="lg"
          >
            <ThemeProvider theme={theTheme}>
              <RTL direction={themOptions && themOptions.activeDir}>
                <ThirdwebSDKProvider
                  desiredChainId={1}
                  // signer={signer}
                  provider={config.provider}
                  queryClient={config.queryClient}
                >
                  <WagmiConfig config={config}>
                    <RainbowKitProvider chains={chains}>
                      <ThirdwebProvider
                        activeChain="ethereum"
                        clientId={process.env.REACT_APP_THIRD_WEB_ID}
                        wagmiClient={config}
                      >
                        <CssBaseline />
                        {/* hint: if on useEffect will Dispatch twice to check for errors */}
                        {/* <React.StrictMode> */}
                        {routing}
                        <ConnectButton />
                      </ThirdwebProvider>
                    </RainbowKitProvider>
                  </WagmiConfig>

                  {/* </React.StrictMode> */}
                </ThirdwebSDKProvider>
              </RTL>
            </ThemeProvider>
          </Container>
        </div>
      </StylesProvider>
    </CacheProvider>
  );
}

export default App;
