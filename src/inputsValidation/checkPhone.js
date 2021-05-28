import { contents, errorClassName } from "./Contents";
import { api } from "../api";

export default async function checkPhone(phone) {
	try {
		let response = await api.request({
			url: "/check/phone/" + phone,
			method: "GET",
		});
        
		if (response.status === 200) {
			return {errorMessage: "", erPhoneNumber: ""};
		}
	} catch (error) {
		var res = error.response;
		var result = "";
		if (res.status === 730) {
			result = {errorMessage: contents.wrongPhone, erPhoneNumber: errorClassName};
		} else if (res.status === 731) {
			result = {errorMessage: contents.phoneExists, erPhoneNumber: errorClassName};
		} else {
			result = {errorMessage: contents.sthIsWrong, erPhoneNumber: ""};
		}
	}
	return result;
}