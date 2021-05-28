import { contents, errorClassName } from "./Contents";

export default async function validatePasswordMatch(repeatPassword, password) {
	if (password != repeatPassword) {
		return {
			errorMessage: contents.passwordMatch,
			erPasswordMatch: errorClassName,
		};
	} else {
		return {errorMessage: "", erPasswordMatch: ""};
	}
}