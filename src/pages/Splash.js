/* eslint-disable no-undef */
import React from "react";
import { Grid } from "@material-ui/core";
import LinearLoading  from "../components/LinearLoading";
// import { useTranslation } from "react-i18next";

// const { t } = useTranslation();

export default function Splash () {
	return (
		<>
			<Grid container
				direction="column"
				justifyContent="space-between"
				alignItems="center"
				sx={{minHeight: "95vh"}}
			>				
				<img
					src="/images/logo.png"
					style={{maxWidth: "30%", }}
					
				/>
				<LinearLoading />
			</Grid>
			
		</>
	);
}