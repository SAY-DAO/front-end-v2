import React from "react";
import { Grid, Divider, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { makeStyles } from "@material-ui/core/styles";
import "react-phone-input-2/lib/material.css";

const useStyles = makeStyles({
	root: {
		background: "transparent",
		border: "1px solid red",
		borderRadius: "50%",
		fontWeight: 200,
		lineHeight: "19px",
		width: "326px",
		height: "36px",
		minWidth: 0,
		margin: 0
	},
});

const EnteryForm = () => {
	const { t } = useTranslation();


	const [values, setValues] = React.useState({
		phone: "",
		email: "",
	});
    
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
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
						className={classes.root}
						isValid={(value, country) => {
							if (value.match(/12345/)) {
								return "Invalid value: "+value+", "+country.name;
							} else if (value.match(/1234/)) {
								return false;
							} else {
								return true;
							}
						}}
						country={"ir"}
						value={values.phone}
						onChange={handleChange("phone")}
					/>
				</FormControl>
			</Grid>
		</Grid>
	);
};

export default EnteryForm;
