import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Button} from "@material-ui/core";

const Register = () => {
	const { t } = useTranslation();

	return (
		<Grid>
			<Grid>
				<img src="/images/register.svg" width="100%" style={{paddingBottom: "20px"}}/>

			</Grid>
			<Grid>
                
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" color="primary" onClick={() => history.push("/register")}>
					{t("button.submit")}
				</Button>
			</Grid>
		</Grid>
	);
};

export default Register;
