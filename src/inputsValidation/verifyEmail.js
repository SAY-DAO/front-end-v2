import { contents, errorClassName } from "./Contents";
import { api } from "../api";

export default async function verifyEmail(email) {
	// Send verification code to email address
	var formData = new FormData();
	formData.set("email", email);
	try {
		let response = await api.request({
			url: "/auth/verify/email",
			method: "POST",
			data: formData
		});
		if (response.status === 200) {
			return response.data.id;
		} 
	} catch (error) {
		var res = error.response;
		var result = "";
		if (!res) {
			result = {
				errorMessage: contents.sthIsWrong,
				erEmail: "",
			};
		} else if (res.status === 400) {
			result = {
				errorMessage: contents.wrongEmail,
				erEmail: errorClassName,
			};
		} else if (res.status === 422) {
			result = {
				errorMessage: contents.emailExists,
				erEmail: errorClassName,
			};
		} else if (res.status === 429) {
			result = {
				errorMessage: contents.manyRequest,
				erEmail: "",
			};
		} else {
			result = {
				errorMessage: contents.sthIsWrong,
				erEmail: "",
			};
		}
	}
	return result;
}
