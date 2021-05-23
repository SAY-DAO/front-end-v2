import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theTheme from "./resources/styles/theTheme";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Splash from "./pages/Splash";
import Intro from "./pages/Intro";

const App = () => (
	<>
		<BrowserRouter>
			<ThemeProvider theme={theTheme}>
				<Container maxWidth="sm">
					<React.StrictMode>
						<Switch>
							<Route exact path="/" component={Splash}/>
							<Route exact path="/intro" component={Intro}/>
						</Switch>
					</React.StrictMode>
				</Container>
			</ThemeProvider>
		</BrowserRouter>
	</>
);
export default App;