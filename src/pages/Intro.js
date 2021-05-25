import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import LangButton from "../components/LangButton";
import SayButton from "../components/SayButton";

const Intro = () => {
	const { t } = useTranslation();
	
    
	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
		>

			<Grid item xs={12} sx={{width: "100%", direction: "rtl"}}>
				<LangButton />
			</Grid>
			<Grid item xs={12}>
				<img src="/images/intro.png" width="100%"/>

			</Grid>
			<Grid item xs={12}>
				<Typography variant='subtitle1'>
					{t("splash.title")}
				</Typography>
				<Typography variant="body2">
					{t("splash.content")}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<SayButton color="primary">
					{t("SayButton.register")}
				</SayButton>
			</Grid>
			<Grid item xs={12}>
				<SayButton color="secondary">
					{t("SayButton.login")}
				</SayButton>
			</Grid>
		</Grid>
	);
};

export default Intro;
