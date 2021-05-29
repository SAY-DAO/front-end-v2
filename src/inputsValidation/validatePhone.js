import { contents , errorClassName} from "./Contents";
import checkPhone from "./checkPhone";

export default async function validatePhone(t, phoneNumber) {
	if (phoneNumber !== "") {
		if (phoneNumber.length < 16) {
			return { errorMessage: t(contents.wrongPhone), erPhoneNumber: errorClassName };
		}
		return (await checkPhone(t, phoneNumber));
	}
	return { errorMessage: phoneNumber, erPhoneNumber: "" };
}
