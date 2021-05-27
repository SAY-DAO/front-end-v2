import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EnteryForm from "../../components/register/EnteryForm";

const useStyles = makeStyles({
	root: {
		position:"absolute",
		left:0,
		right:0,
	},
});

const Register = () => {
	const { t } = useTranslation();
	// const [step, setStep] = useState(1);
	// const [email, setEmail] = useState("");
	// const [phone, setPhone] = useState();

	// // Next step
	// const nextStep = () => {
	// 	setStep(step + 1);
	// };

	// // Previous step
	// const previousStep = () => {
	// 	setStep(step - 1);
	// };

	// // Handle change
	// const hangeHandler = input => e => {

	// }
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
			<Grid item xs={12} sx={{marginTop: 38}}>
				<EnteryForm />
			</Grid>
			<Grid item xs={12}sx={{marginTop: 10}}>
				<Button variant="contained" color="primary" onClick={() => history.push("/register")}
					sx={{
						bottom: 5}}
				>
					{t("button.submit")}
				</Button>
			</Grid>
		</Grid>
	);
};

export default Register;
