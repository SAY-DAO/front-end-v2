/* eslint-disable no-undef */
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import LogRocket from "logrocket";

const env = process.env.ENVIRONMENT || "local";

let envApiUrl = "";

if (env === "prod") {
	envApiUrl = `https://${process.env.REACT_APP_DOMAIN_PROD}/api/v2`;
} else if (env === "stag") {
	envApiUrl = `https://${process.env.REACT_APP_DOMAIN_STAG}/api/v2`;
} else if (env === "dev") {
	envApiUrl = `https://${process.env.REACT_APP_DOMAIN_DEV}/api/v2`;
} else {
	envApiUrl = `https://${process.env.REACT_APP_DOMAIN_LOCAL}/api/v2`;
}

if (env != "local") {
	Sentry.init({
		dsn: process.env.REACT_APP_SENTRY_DSN,
		environment: process.env.ENVIRONMENT,
		integrations: [
			new Integrations.Tracing(),
		],
		tracesSampleRate: 1.0,
	});

	Sentry.configureScope(function(scope) {
		scope.setUser({ id: localStorage.getItem("userId") });
	});

	if (env == "prod") {
		LogRocket.init(process.env.REACT_APP_LOG_ROCKET_ID, {
			dom: {
				inputSanitizer: true,
			},
			network: {
				requestSanitizer: request => {
					// scrub header value from request
					if (request.headers["Authorization"]) {
						request.headers["Authorization"] = "";
					}
					return request;
				},
			},
		});
		LogRocket.getSessionURL(sessionURL => {
			Sentry.configureScope(scope => {
				scope.setExtra("sessionURL", sessionURL);
			});
		});
	}
}

export const apiUrl = envApiUrl;
