import React from "react";
import { Grid, Divider, Typography, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";

// Customized "react-phone-input-2/lib/material.css"
import "../../resources/styles/css/material.css";

const EnteryForm = () => {
	const { t } = useTranslation();


	const [values, setValues] = React.useState({
		phoneNumber: "",
		email: "",
	});
    
	const handleChange = (input) => (event) => {
		setValues({ ...values, [input]: event.target.value });
	};

	const handleChangePhoneNumber = (input, data, event, formattedValue)=> {
		console.log(input, data, event, formattedValue);
		setValues({ ...values, phoneNumber: event.target.value });
		setValues({
			// phoneNumber: values.phoneNumber === "+" + country.dialCode ? "" : values.phoneNumber,
		});
	};

    
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
						value={values.email}
						onChange={handleChange("email")}
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
						value={values.phoneNumber}
						defaultValues={values.phoneNumber}
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

export default EnteryForm;
