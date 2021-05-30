import { contents , errorClassName} from "./Contents";
import sayBase from "../apis/sayBase";

export default async function checkEmail(t, email) {
	try {
		const response  = await sayBase.get(`/check/email/${email}`);
		if (response.status === 200) {
			return {errorMessage: "", erEmail: ""};
		}  
	} catch (error) {
		var res = error.response;
		var result = "";
		if (res.status === 720) {
			result = {errorMessage: t(contents.wrongEmail), erEmail: errorClassName};
		} else if (res.status === 721) {
			result = {errorMessage: t(contents.emailExists), erEmail: errorClassName};
		} else {
			result = {errorMessage: t(contents.sthIsWrong), erEmail: ""};
		}
	}
	return result;
}