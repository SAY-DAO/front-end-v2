import React, { Suspense }  from "react";
import ReactDOM from "react-dom";
import App from "./App";
import swDev from "./swDev";
import "./i18n";
import "./resources/styles/css/style.css";
import { Provider } from "react-redux";
import { Router } from "react-router";
import history from "./history";
import store from "./store";

const loadingMarkup = (
	<div>   
            Loading...
	</div>
);
	

ReactDOM.render(
	<Suspense fallback={loadingMarkup}> 
		<Router history={history}>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</Suspense>

	, document.getElementById("root"));
swDev();
