/* eslint-disable react/prop-types */
import * as React from "react";
import Alert from "@material-ui/core/Alert";
import { contents } from "../inputsValidation/Contents";
import { useTranslation } from "react-i18next";

export default function Message({ onRequestFrontError, onRequestBackError, variant, children, severity }) {
	const { t } = useTranslation();

	const onRequestCheck = () => {
		if (onRequestFrontError.status === 400) {
			return t(contents.wrongEmail);
		} else if (onRequestFrontError.status === 422) {
			return t(contents.emailExists);
		} else if (onRequestFrontError.status === 429) {
			return t(contents.manyRequest);
		} else if (onRequestBackError.status === 720) {
			return t(contents.wrongEmail);
		} else if (onRequestBackError.status === 721) {
			return t(contents.emailExists);
		} else if (onRequestBackError.status === 730) {
			return t(contents.wrongPhone);
		} else if (onRequestBackError.status === 731) {
			return t(contents.phoneExists);
		} else {
			return t(contents.sthIsWrong);
		}
	};
	
	return (
		<Alert variant={variant} severity={severity}>
			{children || onRequestCheck()}
		</Alert>
	);
}
