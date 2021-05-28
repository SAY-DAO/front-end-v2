import { useTranslation } from "react-i18next";

const { t } = useTranslation();

const contents = {
	wrongEmail:t("error.wrongEmail"),
	emailExists:t("error.emailExists"),
	wrongPhone:t("error.wrongPhone"),
	phoneExists:t("error.phoneExists"),
	usernameStart:t("error.usernameStart"),
	usernameLength:t("error.usernameLength"),
	wrongUsername:t("error.wrongUsername"),
	usernameExists:t("error.usernameExists"),
	wrongPassword:t("error.wrongPassword"),
	passwordMatch:t("error.passwordMatch"),
	sthIsWrong:t("error.sthIsWrong"),
	manyRequest:t("error.manyRequest"),
};

export { contents };