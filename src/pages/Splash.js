/* eslint-disable no-undef */
import { Container, Typography, Tooltip } from "@material-ui/core";
import React from "react";
import { Button, Grid } from "@material-ui/core";

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
			<Grid container spacing={3}>

				<Grid item>
					<Button variant="contained" color="primary">
                        Primary
					</Button>
				</Grid>

				<Grid item>
					<Button variant="contained" color="secondary">
                        Secondary
					</Button>
				</Grid>
				<Grid>
					<Tooltip title="this title">
						<Typography variant="subtitle1" align="center">
                        Hover here for tooltip
						</Typography>
					</Tooltip>
				</Grid>
				
			</Grid>
		</Container>
	);
}