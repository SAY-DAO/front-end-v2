import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeVerifyStep } from "../actions/userAction";
import PropTypes from "prop-types";
import { USER_VERIFY_RESET } from "../constants/userConstants";

const Back = ({step}) => {
	const dispatch = useDispatch();

	const clickHandle = () => {
		dispatch(changeVerifyStep(step));
		dispatch({type: USER_VERIFY_RESET, payload: {}});
        
	};
    
	return (
		<Link onClick={clickHandle}>
			<img 
				src="/images/back_orange.svg" 
				alt="back"  
				style={{top: 0, left: 0,width: "24px", margin: "18px", position:"absolute"}}
			/>
		</Link>
	);
};

Back.propTypes = {
	step: PropTypes.string.isRequired
};

export default Back;
