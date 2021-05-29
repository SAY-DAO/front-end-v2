import { contents , errorClassName} from "./Contents";
import { api } from "../apis/sayBase";

export default async function checkEmail(t, email) {
	try {
		let response = await  api.request({
			url: "/check/email/" + email,
			method: "GET",
		});
		if (response.status === 200) {
			console.log(email);
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