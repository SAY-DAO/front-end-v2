import { contents } from "./Contents";
import checkPhone from "./checkPhone";

export default async function validatePhone(t, phoneNumber) {
	if (phoneNumber !== "") {
		if (phoneNumber.length < 15) {
			return { errorMessage: t(contents.wrongPhone) };
		}
		return (await checkPhone(phoneNumber));
	}
	return { errorMessage: phoneNumber, erPhoneNumber: "" };
}
