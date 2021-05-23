import React from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const Intro = () => {
	const { t } = useTranslation();

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
			<h2>{t("Welcome to React")}</h2>
			<Grid item xs={12}>
				<img src="/images/intro.png" width="100%"/>
			</Grid>
			<Grid item xs={12}>
				<Typography>
                    Text
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button>
                    Click
				</Button>
				<Button>
                    Cllick
				</Button>
			</Grid>
		</Grid>
	);
};

export default Intro;
