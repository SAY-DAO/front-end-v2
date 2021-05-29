import React, { useState, useEffect } from "react";
import { Grid, Divider, Typography, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { changeVerifyStep, requestVerifyCode } from "../../actions/userAction";
import { validatePhone, validateEmail } from "../../inputsValidation";
import Message from "../Message";

// Customized "react-phone-input-2/lib/material.css"
import "../../resources/styles/css/material.css";

const EnteryForm = () => {
	const { t } = useTranslation();
	// const [_isLoggedIn, setIsLoggedIn] = useState(false);
	const [validateErr, setValidateErr] = useState("");
	const [erEmail, setErEmail] = useState("");
	const [erPhoneNumber, setErPhoneNumber] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	// const [countryCode, setCountryCode] = useState("");
	const [email, setEmail] = useState("");
	// const [goToVerify, setGoToVerify] = useState(false);
	// const [verificationProperty, setVerificationProperty] = useState("");
	// const [verifyId, setVerifyId] = useState("");
	const [isDisabled, setisDisabled] = useState(true);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(requestVerifyCode());
		dispatch(changeVerifyStep(2));
	};

	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const handleChangePhoneNumber = (input, data, event, formattedValue)=> {
		// console.log(input, data, event, formattedValue);
		setEmail("");
		setPhoneNumber(formattedValue);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			(async () => {
				const result = await validatePhone(t, phoneNumber);
				console.log(result);
				setValidateErr(result.errorMessage);
				setErPhoneNumber(result.erPhoneNumber);
			})();
		}, 500);
		return () => clearTimeout(timeout);
	}, [phoneNumber]);
		
	useEffect(() => {
		const timeout = setTimeout(() => {
			(async () => {
				const result = await validateEmail(t, email);
				console.log(result);
				setValidateErr(result.errorMessage);
				setErEmail(result.erEmail);
			})();
		}, 500);
		return () => clearTimeout(timeout);
	}, [email]);

	useEffect(() => {
		if(!validateErr == ""){
			setisDisabled(true);
		}
		setisDisabled((false));
	}, [email, phoneNumber]);

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
						// isValid={validatePhone(phoneNumber)}
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
				<Button variant="contained" color="primary" onClick={handleClick} disabled={isDisabled}
					sx={{
						bottom: 5}}
				>
					{t("button.submit")}
				</Button>
			</Grid>
			<Grid item xs={12}>
				{!validateErr == "" && (
					<Message variant="filled" severity="error">
						{validateErr}
					</Message>
				)}
				<div>{ erPhoneNumber, erEmail , isDisabled}</div>
			</Grid>
		</Grid>
	);
};

export default EnteryForm;
