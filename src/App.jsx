import React from 'react';
// import { useRoutes } from 'react-router-dom';
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
// import { WagmiConfig } from 'wagmi';
// import { ConnectKitProvider, ConnectKitButton } from 'connectkit';
// import { MetaMaskUIProvider, MetaMaskButton } from '@metamask/sdk-react-ui';
import { ThirdwebSDKProvider, ThirdwebProvider, ConnectWallet } from '@thirdweb-dev/react';
// import Router from './routes/Router';
import { ethers } from 'ethers';
import ThemeSettings from './layouts/customizer/ThemeSettings';
// import { config } from './wallet';
import RTL from './layouts/customizer/RTL';

function App() {
  // const routing = useRoutes(Router);
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

  const activeChain = 'ethereum';
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
                <ThirdwebProvider>
                  <ThirdwebSDKProvider
                    clientId={process.env.REACT_APP_THIRD_WEB_ID}
                    activeChain={activeChain}
                    signer={new ethers.providers.Web3Provider(window.ethereum).getSigner()}
                    // authConfig={{
                    // domain: 'example.org',
                    // authUrl: '/',
                    // loginRedirect: '/',
                    // }}
                  >
                    <CssBaseline />
                    {/* hint: if on useEffect will Dispatch twice to check for errors */}
                    {/* <React.StrictMode> */}
                    {/* {routing} */}
                    {/* </React.StrictMode> */}
                    <div>
                      <div>
                        <ConnectWallet
                          auth={{
                            domain: 'example.org',
                            // authUrl: "/api/auth",
                            loginRedirect: '/',
                          }}
                        />
                      </div>
                      {/* {user && <p>You are signed in as {user.address}</p>} */}
                    </div>
                  </ThirdwebSDKProvider>
                </ThirdwebProvider>
              </RTL>
            </ThemeProvider>
          </Container>
        </div>
      </StylesProvider>
    </CacheProvider>
  );
}

export default App;
