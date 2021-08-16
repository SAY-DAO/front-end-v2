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

const App = () => (
  <>
    <BrowserRouter>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ paddingBottom: 10 }}>
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
            {/* <Route exact path="/family/child/:childId" component={ChildRoom} /> */}
          </Switch>
        </React.StrictMode>
      </Container>
    </BrowserRouter>
  </>
);
export default App;
