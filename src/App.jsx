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
import Router from './routes/Router';

function App() {
  const routing = useRoutes(Router);

  // Configure JSS for RTL
  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  // Create rtl cache for RTL
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });

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
              paddingBottom: 10,
            }}
            maxWidth="lg"
          >
            <CssBaseline />
            {/* hint: if on useEffect will Dispatch twice to check for errors */}
            {/* <React.StrictMode> */}
            {routing}
            {/* </React.StrictMode> */}
          </Container>
        </div>
      </StylesProvider>
    </CacheProvider>
  );
}

export default App;
