/* eslint-disable no-undef */
import React from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Splash () {
	let history = useHistory();

	function myFunction() {
		setTimeout(function(){ history.push("/Intro"); }, 3000);
	}

	myFunction();
	return (
		<Grid container
			direction="column"
			justifyContent="space-between"
			alignItems="center"
			sx={{backgroundColor: "#FFFFFF", minHeight: "95vh"}}
		>				
			<img
				src="/images/logo.png"
				style={{maxWidth: "30%", display: "block", margin: "auto"}}
			/>
		</Grid>
	);
}