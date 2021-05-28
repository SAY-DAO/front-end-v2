// import { contents } from "./Contents";
// import { api } from "../api";

// export default async function verifyPhone(phone) {
// 	// Send verification code to phone number
// 	var formData = new FormData();
// 	formData.set("phone_number", phone);
// 	try {
// 		let response = await api.request({
// 			url: "/auth/verify/phone",
// 			method: "POST",
// 			data: formData
// 		});
// 		if (response.status === 200) {
// 			return response.data.id;
// 		}
// 	} catch (error) {
// 		var res = error.response;
// 		var result = "";
// 		if (!res) {
// 			result = {
// 				errorMessage: contents.sthIsWrong,
// 				erPhoneNumber: "",
// 			};
// 		} else if (res.status === 400) {
// 			result = {
// 				errorMessage: contents.wrongPhone,
// 				erPhoneNumber: errorClassName,
// 			};
// 		} else if (res.status === 422) {
// 			result = {
// 				errorMessage: contents.phoneExists,
// 				erPhoneNumber: errorClassName,
// 			};
// 		} else if (res.status === 429) {
// 			result = {
// 				errorMessage: contents.manyRequest,
// 				erPhoneNumber: "",
// 			};
// 		} else {
// 			result = {
// 				errorMessage: contents.sthIsWrong,
// 				erPhoneNumber: "",
// 			};
// 		}
// 	}
// 	return result;
// }