import { contents, errorClassName } from "./Contents";

export default async function validatePassword(password) {
	if (password !== "" && password.length < 6) {
		return {
			errorMessage: contents.wrongPassword,
			erPassword: errorClassName,
		};
	} else {
		return {errorMessage: "", erPassword: ""};
	}
}