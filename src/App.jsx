import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import Splash from './pages/Splash';
import Intro from './pages/Intro';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import SearchChild from './pages/child/SearchChild';
import SearchResult from './pages/child/SearchResult';
import NeedPage from './pages/NeedPage';
import MyChildPage from './pages/child/MyChildPage';
import Settings from './components/main/profile/Settings';
import Profile from './components/main/profile/Profile';
import Cart from './components/main/Cart';
import Home from './components/main/Home';
import ProfileEdit from './components/main/profile/ProfileEdit';
import ProfileUpload from './components/main/profile/ProfileUpload';
import Report from './pages/Report';

// Configure JSS for RTL
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

// Create rtl cache for RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

const App = () => (
  <CacheProvider value={cacheRtl}>
    <StylesProvider jss={jss}>
      <div id="direction" dir="">
        <BrowserRouter>
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
            <React.StrictMode>
              <Switch>
                <Route exact path="/" component={Splash} />
                <Route exact path="/intro" component={Intro} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
                <Route exact path="/setpassword" component={ResetPassword} />
                <Route
                  exact
                  path="/main/profile/settings"
                  component={Settings}
                />
                <Route exact path="/main/home" component={Home} />
                <Route exact path="/main/profile" component={Profile} />
                <Route
                  exact
                  path="/main/profile/edit"
                  component={ProfileEdit}
                />
                <Route
                  exact
                  path="/main/profile/upload"
                  component={ProfileUpload}
                />
                <Route exact path="/main/cart" component={Cart} />
                <Route exact path="/main/search" component={SearchChild} />
                <Route exact path="/search-result" component={SearchResult} />
                <Route exact path="/child/:childId" component={MyChildPage} />
                <Route
                  exact
                  path="/child/needs/needPage/report/:status"
                  component={Report}
                />
                <Route
                  exact
                  path="/child/:childId/needs/:needId"
                  component={NeedPage}
                />
              </Switch>
            </React.StrictMode>
          </Container>
        </BrowserRouter>
      </div>
    </StylesProvider>
  </CacheProvider>
);
export default App;
