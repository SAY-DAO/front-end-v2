import { contents , errorClassName} from "./Contents";
import sayBase from "../apis/sayBase";

export default async function checkPhone(t, phone) {
	try {

		const response = await sayBase.get(`/check/phone/${phone}`);

		if (response.status === 200) {
			return {errorMessage: "", erPhoneNumber: ""};
		}
	} catch (error) {
		var res = error.response;
		var result = "";
		if (res.status === 730) {
			result = {errorMessage: t(contents.wrongPhone), erPhoneNumber: errorClassName };
		} else if (res.status === 731) {
			result = {errorMessage: t(contents.phoneExists), erPhoneNumber: errorClassName };
		} else {
			result = {errorMessage: t(contents.sthIsWrong), erPhoneNumber: "" };
		}
	}
	return result;
}