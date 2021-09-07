import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

export default function CartAccordion({ cartItems }) {
  const { t } = useTranslation();

  const [totalChildAmount, setTotalChildAmount] = useState({});
  const [expanded, setExpanded] = React.useState(false);
  const [childList, setChildList] = useState([]);

  // filter by child
  useEffect(() => {
    const flags = {};
    const output = [];
    for (let i = 0; i < cartItems.length; i += 1) {
      if (!flags[cartItems[i].childId]) {
        flags[cartItems[i].childId] = true;
        output.push(cartItems[i].childId);
      }
    }
    setChildList(output);
  }, [cartItems]);

  // add amount per child
  // useEffect(() => {
  //   if (childList) {
  //     let sum = 0;
  //     for (let k = 0; k < childList.length; k += 1) {
  //       for (let i = 0; i < cartItems.length; i += 1) {
  //         if (cartItems[i].childId === childList[k]) {
  //           sum += Number(cartItems[i].amount);
  //           setTotalChildAmount((totalChildAmount[childList[k]] = sum));
  //         }
  //       }
  //     }
  //   }
  // }, [cartItems, childList.push, totalChildAmount, childList]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(totalChildAmount);

  return (
    <div>
      {childList &&
        totalChildAmount &&
        childList.map((childId, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {childId}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {totalChildAmount[childId] + t('currency.toman')}y
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}

CartAccordion.propTypes = {
  cartItems: PropTypes.array,
};
