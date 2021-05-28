import { contents, errorClassName } from "./Contents";
import { api } from "../api";

export default async function checkUsername(username) {
	try {
		let response = await api.request({
			url: "/check/username/" + username,
			method: "GET",
		});
		if (response.status === 200) {
			return {errorMessage: "", erUsername: ""};
		}
	} catch (error) {
		var res = error.response;
		var result = "";
		if (res.status === 710) {
			result = {
				errorMessage: contents.wrongUsername,
				erUsername: errorClassName,
			};
		} else if (res.status === 711) {
			result = {
				errorMessage: contents.usernameExists,
				erUsername: errorClassName,
			};
		} else {
			result = {
				errorMessage: contents.sthIsWrong,
				erUsername: ""
			};
		}
	}
	return result;
}