/* eslint-disable react/prop-types */
import * as React from "react";
import Alert from "@material-ui/core/Alert";
import { contents } from "../inputsValidation/Contents";
import { useTranslation } from "react-i18next";

export default function Message({ variant, children, severity }) {
	const { t } = useTranslation();

	if (!children) {
		t(contents.sthIsWrong);
	} else if (children.status === 400) {
		t(contents.wrongEmail);
	} else if (children.status === 422) {
		t(contents.emailExists);
	} else if (children.status === 429) {
		t(contents.manyRequest);
	} else {
		t(contents.sthIsWrong);
	}
	return (
		<Alert variant={variant} severity={severity}>
			{children}
		</Alert>
	);
}