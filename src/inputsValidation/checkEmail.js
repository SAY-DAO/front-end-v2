import { contents, errorClassName } from "./Contents";
import { api } from "../api";

export default async function checkEmail(email) {
	try {
		let response = await  api.request({
			url: "/check/email/" + email,
			method: "GET",
		});
		if (response.status === 200) {
			return {errorMessage: "", erEmail: ""};
		}  
	} catch (error) {
		var res = error.response;
		var result = "";
		if (res.status === 720) {
			result = {errorMessage: contents.wrongEmail, erEmail: errorClassName};
		} else if (res.status === 721) {
			result = {errorMessage: contents.emailExists, erEmail: errorClassName};
		} else {
			result = {errorMessage: contents.sthIsWrong, erEmail: ""};
		}
	}
	return result;
}