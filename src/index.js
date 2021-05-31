import React, { Suspense }  from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theTheme from "./resources/styles/theTheme";
import ReactDOM from "react-dom";
import App from "./App";
import swDev from "./swDev";
import "./i18n";
import "./resources/styles/css/style.css";
import { Provider } from "react-redux";
import { Router } from "react-router";
import history from "./history";
import store from "./store";
import CircularProgress from "@material-ui/core/CircularProgress";

const loadingMarkup = (
	<CircularProgress/>
);
	

ReactDOM.render(
	<ThemeProvider theme={theTheme}>
		<Suspense fallback={loadingMarkup}> 
			<Router history={history}>
				<Provider store={store}>
					<App />
				</Provider>
			</Router>
		</Suspense>
	</ThemeProvider>
	, document.getElementById("root"));
swDev();
