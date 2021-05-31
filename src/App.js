import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Splash from "./pages/Splash";
import Intro from "./pages/Intro";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => (

	<>
		<BrowserRouter>
			<CssBaseline />
			<Container maxWidth="xs">
				<React.StrictMode>
					<Switch>
						<Route exact path="/" component={Splash}/>
						<Route exact path="/intro" component={Intro}/>
						<Route exact path="/register" component={Register}/>
						<Route exact path="/login" component={Login}/>
					</Switch>
				</React.StrictMode>
			</Container>
		</BrowserRouter>
	</>
);
export default App;