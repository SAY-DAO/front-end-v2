import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import swDev from "./swDev";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		// the translations
		// (tip move them in a JSON file and import them,
		// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
		resources: {
			en: {
				translation: {
					"Welcome to React": "Welcome to React and react-i18next"
				}
			},
			fr: {
				translation: {
					"Welcome to React": "blaah blah bllah ..."
				}
			}
		},
		lng: document.querySelector("html").lang,
		fallbackLng: "en",

		interpolation: {
			escapeValue: false
		}
	});
ReactDOM.render(<App />, document.getElementById("root"));
swDev();
