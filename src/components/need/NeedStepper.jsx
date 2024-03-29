/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { IconButton, StepLabel } from '@mui/material/';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { fetchOneNeedReceipts } from '../../redux/actions/childAction';

const ColorLibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, #f2a367 0%, #f2a367 50%, #f2a367 100%)',
    boxShadow: '2px 6px 10px 2px rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, #f2a367 0%,#f2a367 50%, #f2a367 100%)',
  }),
}));

const ColorLibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,#f2a367 0%,#f2a367 50%,#f2a367 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,#f2a367 0%,#f2a367 50%,#f2a367 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

function ColorLibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: (
      <IconButton>
        <img src="/images/icons/doneNeeds/hand.svg" alt="hand icon" style={{ width: '28px' }} />
      </IconButton>
    ),
    2: (
      <IconButton>
        <img
          src="/images/icons/doneNeeds/package.svg"
          alt="package icon"
          style={{ width: '28px' }}
        />
      </IconButton>
    ),
    3: (
      <IconButton>
        <img src="/images/icons/doneNeeds/ngo.svg" alt="ngo icon" style={{ width: '28px' }} />
      </IconButton>
    ),
    4: (
      <IconButton>
        <img src="/images/icons/doneNeeds/child.svg" alt="child icon" style={{ width: '28px' }} />
      </IconButton>
    ),
  };
  return (
    <ColorLibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorLibStepIconRoot>
  );
}

ColorLibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

export default function HorizontalNonLinearStepper({ oneNeed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [chosen, setChosen] = useState(0);
  const [progress, setProgress] = useState([t('needStatus.0')]);
  const [steps, setSteps] = useState([]);

  const childOneNeedReceipt = useSelector((state) => state.childOneNeedReceipt);
  const { success } = childOneNeedReceipt;

  // set steps for product or service
  useEffect(() => {
    if (!success && oneNeed) {
      dispatch(fetchOneNeedReceipts(oneNeed.id));
    }
    if (oneNeed && oneNeed.type === 1) {
      setSteps([t('needStatus.0'), t('needStatus.p1'), t('needStatus.p2'), t('needStatus.p3')]);
    } else {
      setSteps([t('needStatus.0'), t('needStatus.s1'), t('needStatus.s2')]);
    }
  }, [oneNeed, success, progress, t, dispatch]);

  // ---- PAYMENT-----
  // partial payment status = 1
  // complete payment status = 2

  // ---- PRODUCT -----
  // complete purchase for product status = 3
  // complete delivery for product to NGO status = 4
  // complete delivery to child status = 5

  // ----- SERVICE -----
  // complete money transfer to NGO for service status = 3
  // complete delivery to child for service status = 4

  // gray to orange - pending to complete
  useEffect(() => {
    if (oneNeed && oneNeed.status === 2) {
      setActiveStep(0); // complete payment
      setMaxStep(0);
    } else if (oneNeed && oneNeed.status === 3) {
      setActiveStep(1); // complete purchase from online retailer / complete money transfer to NGO
      setMaxStep(1);
    } else if (oneNeed && oneNeed.status === 4) {
      setActiveStep(2); // complete delivery to NGO / complete delivery to child (when service)
      setMaxStep(2);
    } else if (oneNeed && oneNeed.status === 5) {
      setActiveStep(3); // complete delivery to child (when product)
      setMaxStep(3);
    }
  }, [oneNeed]);

  // button text
  const handleStep = (chosenIndex) => () => {
    console.log(chosenIndex);
    if (chosenIndex <= maxStep) {
      setActiveStep(chosenIndex);
      setProgress(steps[chosenIndex]);
      setChosen(chosenIndex);
    }
  };

  const handleReceiptPage = () => {
    navigate(`/child/needs/needPage/report/${chosen + 2}`); // index + 2
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        completed={activeStep - 1}
        sx={{ direction: 'ltr' }}
        connector={<ColorLibConnector />}
      >
        {steps &&
          steps[0] &&
          steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                color="inherit"
                onClick={handleStep(index)}
                StepIconComponent={ColorLibStepIcon}
              >
                {index <= maxStep && <CheckOutlinedIcon color="success" />}
              </StepLabel>
            </Step>
          ))}
      </Stepper>
      <LoadingButton
        variant="contained"
        fullWidth
        sx={{ marginTop: 3, marginBottom: 2 }}
        onClick={handleReceiptPage}
      >
        {progress}
      </LoadingButton>
    </Box>
  );
}

HorizontalNonLinearStepper.propTypes = {
  oneNeed: PropTypes.object,
};
