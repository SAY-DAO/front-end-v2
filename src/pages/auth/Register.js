import React from "react";
import { Grid} from "@material-ui/core";
import EnteryForm from "../../components/register/EnteryForm";
import VerifyCodeForm from "../../components/register/VerifyCodeForm";
import Success from "../../components/Message";
import { useSelector } from "react-redux";


const Register = () => {
	const verifyStep = useSelector((state) => state.verifyStep);
	const { step } = verifyStep;

	const switchComponent = () => {
		switch (step) {
		case "EnteryForm":
			return (
				<>
					<Grid item xs={12} sx={{marginTop: 36}}>
						<EnteryForm/>
					</Grid>
				</>
			);
		case "VerifyCodeForm":
			return (
				<>
					<Grid item xs={12} sx={{marginTop: 36}}>
						<VerifyCodeForm/>
					</Grid>
				</>
			);
		case "3":
			return (
				console.log("3")
			);
		case "4":
			return <Success />;
		default:
			return (
				<Grid item xs={12} sx={{marginTop: 36}}>
					<EnteryForm/>
				</Grid>
			);
		}
	};
	
	return (
		<Grid container
			direction="column"
			justifyContent="center"
			alignItems="center"
			maxWidth
		>
			{switchComponent()}
		</Grid>
	);
};

export default Register;
