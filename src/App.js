import React from "react";
import AppBar from "./components/AppBar";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";

const App = () => (
	<>
		<BrowserRouter>
			<AppBar />
			<Container maxWidth="lg">
				<React.StrictMode>
					<Switch>
						<Route exact path="/" />
					</Switch>
				</React.StrictMode>
			</Container>
		</BrowserRouter>
	</>
);
export default App;