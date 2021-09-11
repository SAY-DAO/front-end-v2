import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import NeedPageProduct from '../need/NeedPageProduct';

export default function CartAccordion({ cartItems }) {
  const { t } = useTranslation();

  // const [totalChildAmount, setTotalChildAmount] = useState({});
  const [expanded, setExpanded] = React.useState(false);
  const [childrenNeedObj, setChildrenNeedObj] = useState({}); // { id1: {items: [item1, item2,...], sayName: ahmad}, ... }
  const [myCart, setMyCart] = useState([]);

  // sort by child
  useEffect(() => {
    setMyCart(cartItems);
    const sorted = {};
    for (let i = 0; i < myCart.length; i += 1) {
      const { childId } = myCart[i];
      if (!sorted[childId]) {
        sorted[childId] = {
          items: [],
          sayName: myCart[i].childSayName,
        };
      }
      sorted[childId].items.push(myCart[i]);
    }
    setChildrenNeedObj(sorted);
  }, [myCart, cartItems]);

  // add amount per child
  // useEffect(() => {
  //   if (childIdList) {
  //     let sum = 0;
  //     for (let k = 0; k < childIdList.length; k += 1) {
  //       for (let i = 0; i < cartItems.length; i += 1) {
  //         if (cartItems[i].childId === childIdList[k]) {
  //           sum += Number(cartItems[i].amount);
  //           setTotalChildAmount((totalChildAmount[childIdList[k]] = sum));
  //         }
  //       }
  //     }
  //   }
  // }, [cartItems, childIdList.push, totalChildAmount, childIdList]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = (needId) => {
    localStorage.removeItem('cartItems');
    const deleteIndex = myCart.findIndex((item) => item.needId === needId);
    console.log(needId);
    console.log(`delete ${deleteIndex}`);
    setMyCart(myCart.splice(deleteIndex, 1));
    localStorage.setItem('cartItems', JSON.stringify(myCart));
  };

  return (
    <div>
      {Object.keys(childrenNeedObj).map((childId) => (
        <Accordion
          key={childId}
          expanded={expanded === `panel${childId + 1}`}
          onChange={handleChange(`panel${childId + 1}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant="subtitle2" sx={{ width: '33%' }}>
              {childrenNeedObj[childId].sayName}
            </Typography>

            <Typography variant="body1" sx={{ width: '33%' }}>
              {childrenNeedObj[childId].sayName + t('currency.toman')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {childrenNeedObj[childId].items.map((item, index) => (
              <Grid key={index} sx={{ marginTop: 1 }}>
                <NeedPageProduct oneNeed={item} handleDelete={handleDelete} />
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

CartAccordion.propTypes = {
  cartItems: PropTypes.array,
};
