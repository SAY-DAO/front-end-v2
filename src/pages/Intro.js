import React from "react";
import Container from "@material-ui/core/Container";
import { Typography, Grid, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import LangButton from "../components/LangButton";

const Intro = () => {
	const { t } = useTranslation();
	let history = useHistory();

	return (
		<Container>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={2}
			>

				<Grid item xs={12} sx={{width: "100%", direction: "rtl"}}>
					<LangButton />
				</Grid>
				<Grid item xs={12} sx={{paddingBottom: 4}}>
					<img src="/images/intro.png" width="100%" style={{paddingBottom: "20px"}}/>
					<Typography variant="subtitle1" align="center" sx={{paddingBottom: 2}}>
						{t("intro.slideTitle1")}
					</Typography>
					<Typography variant="body1" align="center">
						{t("intro.slideDesc1")}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" color="primary" onClick={() => history.push("/register")}>
						{t("button.register")}
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button variant="outlined" color="primary" onClick={() => history.push("/login")}>
						{t("button.login")}
					</Button>
				</Grid>
			</Grid>
		</Container>
		
	);
};

export default Intro;
