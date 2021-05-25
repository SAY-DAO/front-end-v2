import { Button } from "@material-ui/core";
import { PropTypes } from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		border: 0,
		borderRadius: 3,
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "white",
		height: 48,
		padding: "0 30px",
	},
};
  
const SayButton = ({color, children}) => {
	console.log(color);
	return (
		<Button variant="contained" color={color}>
			{children}
		</Button>
	);
};

SayButton.propTypes = {
	color: PropTypes.string,
	children: PropTypes.string
};

export default  withStyles(styles)(SayButton);
