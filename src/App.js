import React, { Suspense } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theTheme from "./resources/styles/theTheme";
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
			<Suspense fallback=""> {/*i18n translations might still be loaded by the http backend*/}
				<ThemeProvider theme={theTheme}>
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
				</ThemeProvider>
			</Suspense>
		</BrowserRouter>
	</>
);
export default App;