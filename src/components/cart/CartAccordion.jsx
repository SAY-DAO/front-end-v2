import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Grid, FormControl, Divider, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import LoadingButton from '@material-ui/lab/LoadingButton';
import NeedPageProduct from '../need/NeedPageProduct';
import { changeCartBadgeNumber } from '../../actions/main/cartAction';
import Donation from '../payment/DonationPercentage';
import Wallet from '../payment/Wallet';

export default function CartAccordion({ cartItems }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // const [totalChildAmount, setTotalChildAmount] = useState({});
  const [expanded, setExpanded] = React.useState();
  const [childrenNeedObj, setChildrenNeedObj] = useState({}); // { id1: {items: [item1, item2,...], sayName: ahmad}, ... }
  const [myCart, setMyCart] = useState([]);
  const [addedAmount, setAddedAmount] = useState(0);

  // sort by child
  useEffect(() => {
    setMyCart(cartItems);
    const sorted = {};
    let total = 0;
    for (let i = 0; i < myCart.length; i += 1) {
      total += Number(myCart[i].amount);

      const { childId } = myCart[i];
      if (!sorted[childId]) {
        sorted[childId] = {
          items: [],
          sayName: myCart[i].childSayName,
          totalAmount: 0,
        };
      }
      sorted[childId].items.push(myCart[i]);
      sorted[childId].totalAmount += myCart[i].amount;
    }
    setAddedAmount(total);
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
    setMyCart(myCart.splice(deleteIndex, 1));
    localStorage.setItem('cartItems', JSON.stringify(myCart));
    const badgeNumber = myCart.length;
    dispatch(changeCartBadgeNumber(badgeNumber));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    console.log('ji');
  };

  return (
    <Grid sx={{ marginBottom: '100px' }}>
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
              {childrenNeedObj[childId].sayName}{' '}
              {`(${childrenNeedObj[childId].items.length})`}
            </Typography>

            <Typography variant="body1">
              {childrenNeedObj[childId].totalAmount.toLocaleString() +
                t('currency.toman')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ padding: 0, paddingTop: 2, paddingBottom: 1 }}
          >
            {childrenNeedObj[childId].items.map((item, index) => (
              <Grid key={index} sx={{ marginTop: 1 }}>
                <NeedPageProduct oneNeed={item} handleDelete={handleDelete} />
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      {cartItems[0] && (
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Grid item sx={{ width: '100%', padding: 2 }}>
            <Paper>
              <FormControl
                required
                variant="standard"
                sx={{ width: '100%', padding: 2 }}
              >
                <form
                  style={{
                    width: '100%',
                  }}
                >
                  <Grid
                    item
                    sx={{
                      bottom: 80,
                      background: 'white',
                      width: '100%',
                    }}
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      alignItems="center"
                      sx={{
                        padding: 0,
                        textAlign: 'center',
                        marginTop: 2,
                        marginBottom: 2,
                      }}
                    >
                      <Grid item xs={3}>
                        <Typography variant="subtitle2">
                          {t('needPage.payTitle')}
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Divider sx={{ width: '95%' }} />
                      </Grid>
                    </Grid>
                    <Donation />
                    <Wallet />
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      onClick={handlePayment}
                    >
                      <Typography
                        component="div"
                        variant="subtitle1"
                        sx={{
                          color: 'white',
                          display: 'contents',
                        }}
                      >
                        {addedAmount.toLocaleString() + t('currency.toman')}
                      </Typography>
                    </LoadingButton>
                  </Grid>
                </form>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

CartAccordion.propTypes = {
  cartItems: PropTypes.array,
};
