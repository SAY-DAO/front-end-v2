import { contents } from "./Contents";
import checkEmail from "./checkEmail";

export default async function validateEmail(t, email) {
	if (email !== "") {
		if (email.indexOf("@") < 0 || email.indexOf(".") < 0 ) {
			return {errorMessage: await t(contents.wrongEmail)};
		} else {
			return (await checkEmail(t, email));
		}
	} else {
		return {errorMessage: "", erEmail: ""};
	}
}