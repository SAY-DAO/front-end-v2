import React, { useState } from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Intro = () => {
	const [lang, setLang] = useState("fa");
	const { t } = useTranslation();

	const clickHandler = () => {
		console.log(lang);
		switch(lang) {
		case "en":
			setLang("fa");
			break;
		case "fa":
			setLang("en");
			break;
		default:
			setLang("fa");
		}

		i18next.changeLanguage(lang);
	};
    
	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
			<Grid item xs={12}>
				<h2>{t("button.skip")}</h2>
				<Button variant="outlined" onClick={clickHandler}>{lang}</Button>
			</Grid>
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
