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
import Donation from '../payment/Donation';
import Wallet from '../payment/Wallet';

export default function CartAccordion({ cartItems }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // const [totalChildAmount, setTotalChildAmount] = useState({});
  const [expanded, setExpanded] = React.useState();
  const [childrenNeedObj, setChildrenNeedObj] = useState({}); // { id1: {items: [item1, item2,...], sayName: ahmad}, ... }
  const [myCart, setMyCart] = useState([]);
  const [addedAmount, setAddedAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [userCredit, setUserCredit] = useState(0);
  const [isCredit, setIsCredit] = useState(false);
  const [amount, setAmount] = useState();
  const [donation, setDonation] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [onlyWallet, setOnlyWallet] = useState(false);

  // set donation
  useEffect(() => {
    const theDonation =
      (percentage * addedAmount) / 100 -
      (((percentage * addedAmount) / 100) % 100);
    setDonation(theDonation);
  }, [percentage, addedAmount]);

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

  // set amount
  useEffect(() => {
    setOnlyWallet(false);
    const remaining = addedAmount;
    setAmount(remaining);
    if (isCredit) {
      if (userCredit < remaining + donation) {
        if (
          remaining + donation - userCredit > 0 &&
          remaining + donation - userCredit < 1000
        ) {
          setFinalAmount(1000); // for the button
        }
        if (remaining + donation - userCredit >= 1000) {
          setFinalAmount(remaining + donation - userCredit); // for the button
        }
      } else if (userCredit >= remaining + donation) {
        setFinalAmount(0); // for the button
        setOnlyWallet(true);
      }
    } else if (!isCredit) {
      setFinalAmount(remaining + donation); // for the button
    }
  }, [userCredit, donation, amount, isCredit, addedAmount]);

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
    console.log(`method = Cart`);
    console.log(`amount = ${amount}`);
    console.log(`donation = ${donation}`);
    console.log(`useCredit = ${isCredit}`);
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
                      sx={{
                        padding: 0,
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
                      <Grid item>
                        <Donation
                          setPercentage={setPercentage}
                          amount={addedAmount}
                        />
                        <Wallet
                          isCredit={isCredit}
                          setIsCredit={setIsCredit}
                          userCredit={userCredit}
                          setUserCredit={setUserCredit}
                        />
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
                            {!onlyWallet
                              ? finalAmount.toLocaleString() +
                                t('currency.toman')
                              : t('button.payFromCredit')}
                          </Typography>
                        </LoadingButton>
                      </Grid>
                    </Grid>
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
