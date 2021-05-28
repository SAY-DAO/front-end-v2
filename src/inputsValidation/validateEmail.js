import { contents, errorClassName } from "./Contents";
import checkEmail from "./checkEmail";

export default async function validateEmail(email) {
	if (email !== "") {
		if (email.indexOf("@") < 0 || email.indexOf(".") < 0) {
			return {errorMessage: contents.wrongEmail, erEmail: errorClassName};
		} else {
			return (await checkEmail(email));
		}
	} else {
		return {errorMessage: "", erEmail: ""};
	}
}