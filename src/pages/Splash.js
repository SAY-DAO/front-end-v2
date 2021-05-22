/* eslint-disable no-undef */
import { Container, Typography } from "@material-ui/core";
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default function Splash () {
	return (
		<Container>
			<Typography variant="h5">
                    
بنیان بنیادی
برای امید و آسودگی 
			</Typography>
			<Typography variant="body1">
            صدایی که به گوش شما می‌رسد واقعی است
			</Typography>
			<Checkbox defaultChecked />
		</Container>
	);
}