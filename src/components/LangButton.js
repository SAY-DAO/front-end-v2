import { Button } from "@material-ui/core";
import React, { useState } from "react";
import i18next from "i18next";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
	root: {
		background: "transparent",
		border: "1px solid #F59E39",
		borderRadius: "100%",
		height: 48,
		minWidth: 0,
	},
});
  
const LangButton = () => {
	const [lang, setLang] = useState();

	const clickHandler = () => {
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
	const classes = useStyles();
	return (
		<Button variant="outlined" className={classes.root} onClick={clickHandler}>
			{lang==="en" ? "en" : "fa"}
		</Button>
	);
};

export default LangButton;
