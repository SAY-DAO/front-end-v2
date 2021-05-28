import React, { useState } from "react";
import { Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EnteryForm from "../../components/register/EnteryForm";
import Success from "../../components/Success";

const useStyles = makeStyles({
	root: {
		position:"absolute",
		left:0,
		right:0,
	},
});

const Register = () => {
	const [step, setstep] = useState(1);
	// Next step
	// const nextStep = () => {
	// 	setStep(step + 1);
	// };

	// Previous step
	// const previousStep = () => {
	// 	setStep(step - 1);
	// };

	// Handle fields change

	const switchComponent = () => {
		switch (step) {
		case 1:
			return (
				<Grid item xs={12} sx={{marginTop: 38}}>
					<EnteryForm/>
				</Grid>
		
			);
		case 2:
			return (
				console.log("2"),
				setstep(2)
			);
		case 3:
			return (
				console.log("3")
			);
		case 4:
			return <Success />;
		default:
			(console.log("This is a multi-step form built with React."));
		}
	};
	
	const classes = useStyles();
	return (
		<Grid container
			direction="column"
			justifyContent="center"
			alignItems="center"
			maxWidth
		>
			<Grid item xs={12}>
				<img src="/images/register.svg" width="100%" style={{paddingBottom: "20px"}} className={classes.root}/>
			</Grid>
			{switchComponent()}
			
		</Grid>
	);
};

export default Register;
