import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Splash from './pages/Splash';
import Intro from './pages/Intro';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import SearchChild from './pages/child/SearchChild';
import SearchResult from './pages/child/SearchResult';
import Main from './pages/Main';
import NeedPage from './pages/NeedPage';
import MyChildPage from './pages/MyChildPage';

const App = () => (
  <>
    <BrowserRouter>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          margin: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 10,
          overflow: 'hidden',
        }}
      >
        <React.StrictMode>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route exact path="/intro" component={Intro} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/setpassword" component={ResetPassword} />
            <Route exact path="/search-child" component={SearchChild} />
            <Route exact path="/search-result" component={SearchResult} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/main/profile" component={Main} />
            <Route exact path="/main/cart" component={Main} />
            <Route exact path="/main/search" component={Main} />
            <Route exact path="/main/dashboard" component={Main} />
            <Route exact path="/child/:childId" component={MyChildPage} />
            <Route
              exact
              path="/child/:childId/needs/:needId"
              component={NeedPage}
            />
            {/* <Route exact path="/family/child/:childId" component={ChildRoom} /> */}
          </Switch>
        </React.StrictMode>
      </Container>
    </BrowserRouter>
  </>
);
export default App;
