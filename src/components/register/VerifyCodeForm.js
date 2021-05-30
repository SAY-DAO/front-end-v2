import React from "react";
import { Grid, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";

// Customized "react-phone-input-2/lib/material.css"
import "../../resources/styles/css/material.css";

const VerifyCodeForm = () => {
	const { t } = useTranslation();

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
