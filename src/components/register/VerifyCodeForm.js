import React, {useState, useEffect} from "react";
import { Grid, Button,  Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useTranslation, Trans } from "react-i18next";
// Customized "react-phone-input-2/lib/material.css"
import "../../resources/styles/css/material.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const VerifyCodeForm = () => {
	const { t } = useTranslation();
	// eslint-disable-next-line no-unused-vars
	const [verificationTool, setverificationTool] = useState("");
	const verifyInfo = useSelector((state) => state.verifyInfo);
	const { verifyData } = verifyInfo;  

	useEffect(() => {
		if(verifyData.type === "phone"){
			setverificationTool(verifyData.phone_number);
		}else if (verifyData.type === "email"){
			setverificationTool(verifyData.email);
		}
	}, [verifyData]);

	return (
		<Grid container
			direction="column"
			justifyContent="center"
			alignItems="center"
			maxWidth
			sx={{direction: "ltr"}}
		>
			<Link to="/identity">
				<img src="/images/back_orange.svg" className="back" alt="back" />
			</Link>
			<Grid item xs={12} sx={{marginBottom: 2}}>
				<Typography variant="subtitle1">
					<Trans i18nKey={`verify.content.by${capitalize(verifyData.type)}`}>
						کد تایید به شماره موبایل <span dir="ltr" >{{verificationTool}}</span> ارسال شد.
					</Trans>
				</Typography>
			</Grid>
			<Grid item xs={12}>					
				<FormControl variant="outlined">
					<TextField
						id="outlined-adornment-email"
						label={t("placeholder.code")}
						aria-describedby="outlined-weight-helper-text"
						inputProps={{
							"aria-label": "email",
						}}
					/>
				</FormControl>
			</Grid>
			<Grid item xs={12}sx={{marginTop: 10}}>
				<Button variant="contained" color="primary" onClick={() => history.push("/register")}
					sx={{
						bottom: 5}}
				>
					{t("button.submit")}
				</Button>
			</Grid>
		</Grid>
	);
};

export default VerifyCodeForm;
