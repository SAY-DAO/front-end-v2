import { contents, errorClassName } from "./Contents";
import checkPhone from "./checkPhone";

export default async function validatePhone(phone) {
	if (phone !== "") {
		if (phone.length < 13 || phone.length < 15) {
			return { errorMessage: contents.wrongPhone, erPhoneNumber: errorClassName };
		}
		return (await checkPhone(phone));
	}
	return { errorMessage: "", erPhoneNumber: "" };
}
