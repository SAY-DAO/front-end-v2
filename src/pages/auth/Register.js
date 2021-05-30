import React from "react";
import { Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EnteryForm from "../../components/verify/EnteryForm";
import VerifyCodeForm from "../../components/verify/VerifyCodeForm";
import Success from "../../components/Message";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
	root: {
		position:"absolute",
		left:0,
		right:0,
		maxHeight: "280px"
	},
});

const Register = () => {
	const verifyStep = useSelector((state) => state.verifyStep);
	const { step } = verifyStep;

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
				<Grid item xs={12} sx={{marginTop: 38}}>
					<VerifyCodeForm/>
				</Grid>
			);
		case 3:
			return (
				console.log("3")
			);
		case 4:
			return <Success />;
		default:
			return (
				<Grid item xs={12} sx={{marginTop: 38}}>
					<EnteryForm/>
				</Grid>
			);
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
