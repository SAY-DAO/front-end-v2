/* eslint-disable no-undef */
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theTheme from "./resources/styles/theTheme";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Splash from "./pages/Splash";

console.log(process.env);
const App = () => (
	<>
		<BrowserRouter>
			<ThemeProvider theme={theTheme}>
				<Container maxWidth="md">
					<React.StrictMode>
						<Switch>
							<Route exact path="/" component={Splash}/>
						</Switch>
					</React.StrictMode>
				</Container>
			</ThemeProvider>
		</BrowserRouter>
	</>
);
export default App;