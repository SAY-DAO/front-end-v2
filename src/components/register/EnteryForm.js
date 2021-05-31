/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Grid, Divider, Typography, Button } from "@material-ui/core";
import LoadingButton from "@material-ui/lab/LoadingButton";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useTranslation, Trans } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { changeVerifyStep, verifyEmail, verifyPhone } from "../../actions/userAction";
import { validatePhone, validateEmail } from "../../inputsValidation";
import Message from "../Message";
import { contents , errorClassName} from "../../inputsValidation/Contents";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Back from "../Back";
// Customized "react-phone-input-2/lib/material.css"
import "../../resources/styles/css/material.css";

const useStyles = makeStyles({
	root: {
		position:"absolute",
		top:0,
		left:0,
		right:0,
		maxHeight: "280px",
	},
});

const EnteryForm = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const verifyInfo = useSelector((state) => state.verifyInfo);
	const { loading, error, success } = verifyInfo;

	// const [_isLoggedIn, setIsLoggedIn] = useState(false);
	const [validateErr, setValidateErr] = useState("");
	const [erEmail, setErEmail] = useState("");
	const [erPhoneNumber, setErPhoneNumber] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [email, setEmail] = useState("");
	const [isDisabled, setisDisabled] = useState(true);


	useEffect(() => {
		if((validateErr.length > 3) || (validateErr === "" && (email == "" && phoneNumber == "")) ){
			setisDisabled(true);
		}else {
			setisDisabled(false);
		}
	}, [validateErr, email, phoneNumber]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			(async () => {
				const result = await validateEmail(t, email);
				setValidateErr(result.errorMessage);
				setErEmail(result.erEmail);
			})();
		}, 500);
		return () => clearTimeout(timeout);
	}, [email]);
	
	useEffect(() => {
		const timeout = setTimeout(() => {
			(async () => {
				const result = await validatePhone(t, phoneNumber);
				setValidateErr(result.errorMessage);
				setErPhoneNumber(result.erPhoneNumber);
			})();
		}, 500);
		return () => clearTimeout(timeout);
	}, [phoneNumber]);

	useEffect(() => {
		if(success){
			dispatch(changeVerifyStep("VerifyCodeForm"));
		}
	}, [success]);

	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
		setPhoneNumber(countryCode);
	};

	const handleChangePhoneNumber = (input, data, event, formattedValue)=> {
		setEmail("");
		setCountryCode(data.countryCode);
		setPhoneNumber(formattedValue);
	};

	const validateTheEmail = async () => {
		let result = await validateEmail(t, email);
		if (!(result.errorMessage || result.erEmail)) {
			dispatch(verifyEmail(email));
		} else {
			setValidateErr(result.errorMessage);
			setErEmail(result.erEmail);
			return;
		}
	};

	const validateThePhone = async () => {
		let result = await validatePhone(t, phoneNumber);
		if (!(result.errorMessage || result.erPhoneNumber)) {
			dispatch(verifyPhone(phoneNumber.split(" ").join("")));
		} else {
			setValidateErr(result.errorMessage);
			setErPhoneNumber(result.erPhoneNumber);
			return;
		}
	};

	const handleVerify = () => {
		if (!(validateErr || erPhoneNumber || erEmail)) {
			if ((email !== "") && (phoneNumber === "")) {
				console.log("verfying email...");
				validateTheEmail();
			} else if((phoneNumber !== "") && (email === "")) {
				console.log("verfying phone number...");
				validateThePhone();
			}
		} else {
			setValidateErr("verification logic error");
			return;
		}
	};


	const handleClick = () => {
		if (!(phoneNumber || email)) {
			setValidateErr(contents.fillOne);
			setErEmail(errorClassName);
			setErPhoneNumber(errorClassName);
		} else {
			console.log("verfying...");
			handleVerify();
		}
	};

	const classes = useStyles();
	return (
		<Grid container
			direction="column"
			justifyContent="center"
			alignItems="center"
			maxWidth
			sx={{direction: "ltr"}}
		>
			<Back to={"/intro"}/>
			<Grid item xs={12}>
				<img src="/images/register.svg" width="100%" style={{paddingBottom: "20px"}} className={classes.root}/>
			</Grid>
			<Grid item xs={12}>
				<FormControl variant="outlined">
					<PhoneInput
						specialLabel={t("placeholder.phoneNumber")}
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
					<Divider sx={{marginTop: 4, marginBottom: 4}}>
						<Typography variant="subtitle1">
							{t("devider.register")}
						</Typography>
					</Divider>
					<TextField
						type="email"
						id="outlined-adornment-email"
						label={t("placeholder.email")}
						value={email}
						onChange={handleChangeEmail}
						aria-describedby="outlined-weight-helper-text"
						inputProps={{
							"aria-label": "email",
						}}
					/>
					
				</FormControl>
			</Grid>
			<Grid item xs={12} sx={{marginTop: 8}}>
				{ loading ? (
					<LoadingButton loading variant="contained">
						{t("button.submit")}
					</LoadingButton>) :
					(<Button variant="contained" color="primary" onClick={handleClick} disabled={isDisabled} sx={{bottom: 5}}>
						{t("button.submit")}
					</Button>)
				}
			</Grid>
			<Grid item xs={12} sx={{marginTop: 2}}>
				<Typography variant="subtitle1">
					<Trans i18nKey="join.alreadyJoined">
					If already joined tap
						<Link to="/Login" >here</Link>
					</Trans>
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{( !(validateErr == "") || !(erPhoneNumber == "")  || !(erEmail == "") || error) && (
					<Message 
						onRequestFrontError={error}
						onRequestBackError={error} 
						variant="filled" 
						severity="error"
					>
						{validateErr || erPhoneNumber || erEmail}
					</Message>
				)}
			</Grid>
		</Grid>
	);
};

export default EnteryForm;

