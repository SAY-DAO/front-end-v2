/* eslint-disable react/prop-types */
import * as React from "react";
import Alert from "@material-ui/core/Alert";

export default function Message({ variant, children, severity }) {
	return (
		<Alert variant={variant} severity={severity}>
			{children}
		</Alert>
	);
}