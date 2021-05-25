import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		position:"absolute",
		left:0,
		right:0,
	},
});

const Register = () => {
	const { t } = useTranslation();
	const classes = useStyles();

	return (
		<Grid container
			direction="column"
			justifyContent="center"
			alignItems="center"
			spacing={2}
			maxWidth>
			<Grid>
				<img src="/images/register.svg" width="100%" style={{paddingBottom: "20px"}} className={classes.root}/>
			</Grid>
			<Grid>
                
			</Grid>
			<Grid item xs={12}>
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
