import React, { useState, useEffect } from "react";
import { Grid, Divider, Typography, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { changeVerifyStep, requestVerifyCode } from "../../actions/userAction";
import { validatePhone, validateEmail } from "../../inputsValidation";

// Customized "react-phone-input-2/lib/material.css"
import "../../resources/styles/css/material.css";

const EnteryForm = () => {
	const { t } = useTranslation();
	// const [_isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState("");
	const [erEmail, setErEmail] = useState("");
	const [erPhoneNumber, setErPhoneNumber] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	// const [countryCode, setCountryCode] = useState("");
	const [email, setEmail] = useState("");
	// const [goToVerify, setGoToVerify] = useState(false);
	// const [verificationProperty, setVerificationProperty] = useState("");
	// const [verifyId, setVerifyId] = useState("");

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(requestVerifyCode());
		dispatch(changeVerifyStep(2));
	};

	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const handleChangePhoneNumber = (input, data, event, formattedValue)=> {
		console.log(input, data, event, formattedValue);
		setEmail("");
		setPhoneNumber(formattedValue);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			(async () => {
				const result = await validatePhone(phoneNumber);
				setError(result.errorMessage);
				setErPhoneNumber(result.erPhoneNumber);
			})();
		}, 500);
		return () => clearTimeout(timeout);
	}, [phoneNumber]);
		
	useEffect(() => {
		const timeout = setTimeout(() => {
			(async () => {
				const result = await validateEmail(email);
				setError(result.errorMessage);
				setErEmail(result.erEmail);
			})();
		}, 500);
		return () => clearTimeout(timeout);
	}, [email]);

	return (
		<Grid container
			direction="column"
			justifyContent="center"
			alignItems="center"
			maxWidth
			sx={{direction: "ltr"}}
		>
			<Grid item xs={12}>
				<FormControl variant="outlined">
					<TextField
						id="outlined-adornment-email"
						label={t("placeholder.email")}
						value={email}
						onChange={handleChangeEmail}
						aria-describedby="outlined-weight-helper-text"
						inputProps={{
							"aria-label": "email",
						}}
					/>
					<Divider sx={{marginTop: 4, marginBottom: 4}}>
						<Typography variant="subtitle1">
							{t("devider.register")}
						</Typography>
					</Divider>
					<PhoneInput
						specialLabel={t("placeholder.phoneNumber")}
						isValid={(value) => {
							if (!value.startsWith("98")) {
								return <Typography variant="subtitle1">
									{t("error.wrongPhone")}
								</Typography>;
							} else if (value.match(/1234/)) {
								return false;
							} else {
								return true;
							}
						}}
						country={"ir"}
						value={phoneNumber}
						disableDropdown='false'
						onChange={handleChangePhoneNumber}
						inputProps={{
							name: "phone"
						}}
						defaultMask="... ... .. ..."
						countryCodeEditable={false}
					/>
				</FormControl>
			</Grid>
			<Grid item xs={12}sx={{marginTop: 10}}>
				<Button variant="contained" color="primary" onClick={handleClick}
					sx={{
						bottom: 5}}
				>
					{t("button.submit")}
				</Button>
			</Grid>
		</Grid>
	);
};

export default EnteryForm;
