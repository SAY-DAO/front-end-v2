import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theTheme from "./styles/theTheme";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Splash from "./pages/Splash";

const App = () => (
	<>
		<BrowserRouter>
			<ThemeProvider theme={theTheme}>
				<Container maxWidth="lg">
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