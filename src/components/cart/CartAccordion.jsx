import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Grid, FormControl, Divider, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import NeedPageProduct from '../need/NeedPageProduct';
import { changeCartBadgeNumber, updateBackEndCart } from '../../redux/actions/main/cartAction';
import Donation from '../payment/Donation';
import Wallet from '../payment/Wallet';
import { checkCartPayment, makeCartPayment } from '../../redux/actions/paymentAction';
import Message from '../Message';
import { CHECK_CART_PAYMENT_RESET, SHAPARAK_RESET } from '../../redux/constants/paymentConstants';
import {
  CART_ADD_RESET,
  CART_BADGE_RESET,
  CART_UPDATE_BACK_RESET,
} from '../../redux/constants/main/cartConstants';
import PaymentModal from '../modals/PaymentModal';
import { PaymentGateWays } from '../../utils/types';

export default function CartAccordion() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowReference, setWindowReference] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
  const [isPaying, setIsPaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [gateWay, setGateWay] = useState();

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  const cartUpdate = useSelector((state) => state.cartUpdate);
  const {
    updateResult,
    success: successCartUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = cartUpdate;

  const shaparakGate = useSelector((state) => state.shaparakGate);
  const {
    result: shaparakResult,
    loading: loadingShaparakGate,
    success: successShaparakGate,
    error: errorShaparakGate,
  } = shaparakGate;

  const cartPayCheck = useSelector((state) => state.cartPayCheck);
  const {
    result: cartCheckPayResult,
    loading: loadingCartPayCheck,
    success: successCartPayCheck,
    error: errorCartPayCheck,
  } = cartPayCheck;

  // loading button
  useEffect(() => {
    if (loadingUpdate || loadingShaparakGate || loadingCartPayCheck) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingUpdate, loadingShaparakGate, loadingCartPayCheck, successCartPayCheck]);

  // disable button
  useEffect(() => {
    if (
      !successCartUpdate ||
      !successCartPayCheck ||
      (cartCheckPayResult && cartCheckPayResult.needs && cartCheckPayResult.needs[0])
    ) {
      setIsDisabled(false);
    } else if (isSuccess) {
      setIsDisabled(true);
    }
  }, [cartCheckPayResult, successCartPayCheck, successCartUpdate, isSuccess]);

  // Shaparak gate  - redirect to bank - use gateway_payment_id to distinguish between cart payment
  useEffect(() => {
    if (successShaparakGate && successCartUpdate && updateResult.needs[0]) {
      if (windowReference) {
        // only wallet -status 299
        if (shaparakResult.status === 299) {
          windowReference.document.write(shaparakResult.response);
        } else {
          setIsPaying(true);
          windowReference.document.write('loading...');
          windowReference.location = shaparakResult.link;
        }
      }
      // Set a timeout for the above interval (10 Minutes)
      const doneNeedInterval = setInterval(() => dispatch(checkCartPayment()), 8000);
      setTimeout(() => clearInterval(doneNeedInterval), 60 * 10 * 1000);
    }
  }, [
    shaparakResult,
    successShaparakGate,
    dispatch,
    successCartUpdate,
    windowReference,
    updateResult,
  ]);

  // pay or remove unavailable
  useEffect(() => {
    if (successCartUpdate && updateResult.needs[0] && !successShaparakGate && gateWay) {
      setModalOpen(false);
      dispatch(makeCartPayment(donation, isCredit, gateWay));
    }
    // } else if (
    //  errorShaparakGate || errorUpdate || errorCartPayCheck
    // ) {
    //   // dispatch(removeUnavailableItems(updateResult.data.invalidNeedIds));
    // }
  }, [successCartUpdate, updateResult, gateWay]);

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, []);

  // clear time
  useEffect(() => {
    if (
      successCartUpdate &&
      cartCheckPayResult &&
      cartCheckPayResult.needs &&
      !cartCheckPayResult.needs[0]
    ) {
      if (successShaparakGate) {
        dispatch(makeCartPayment(donation, isCredit, gateWay || PaymentGateWays.ZIBAL));
        setIsSuccess(true);
        dispatch({ type: SHAPARAK_RESET });
        dispatch({ type: CART_BADGE_RESET });
        dispatch({ type: CHECK_CART_PAYMENT_RESET });
        dispatch({ type: CART_ADD_RESET });

        window.localStorage.removeItem('SAY-cartItems');
        // clear all intervals
        // Get a reference to the last interval + 1
        const intervalId = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);
        // Clear any timeout/interval up to that id
        for (let i = 1; i < intervalId; i += 1) {
          window.clearInterval(i);
        }
      }
      if (!successShaparakGate) {
        dispatch({ type: SHAPARAK_RESET });
        dispatch({ type: CART_UPDATE_BACK_RESET });
      }
    }
  }, [cartCheckPayResult, successShaparakGate]);

  // set donation
  useEffect(() => {
    const theDonation =
      (percentage * addedAmount) / 100 - (((percentage * addedAmount) / 100) % 100);
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
        if (remaining + donation - userCredit > 0 && remaining + donation - userCredit < 1000) {
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

  // accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // delete item
  const handleDelete = (needId) => {
    localStorage.removeItem('SAY-cartItems');
    const deleteIndex = myCart.findIndex((item) => item.needId === needId);
    setMyCart(myCart.splice(deleteIndex, 1));
    localStorage.setItem('SAY-cartItems', JSON.stringify(myCart));
    const badgeNumber = myCart.length;
    dispatch(changeCartBadgeNumber(badgeNumber));
  };

  const handlePopUp = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  // check & payment
  const handleCartCheck = (selectedGateWay) => {
    setGateWay(selectedGateWay);
    const ref = window.open('', '_blank');
    setWindowReference(ref);
    dispatch(updateBackEndCart());
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
              {childrenNeedObj[childId].sayName} {`(${childrenNeedObj[childId].items.length})`}
            </Typography>

            <Typography variant="body1">
              {childrenNeedObj[childId].totalAmount.toLocaleString() + t('currency.toman')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0, paddingTop: 2, paddingBottom: 1 }}>
            {childrenNeedObj[childId].items.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid key={index} sx={{ marginTop: 1 }}>
                <NeedPageProduct oneNeed={item} handleDelete={handleDelete} />
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Grid container direction="column" justifyContent="flex-end" alignItems="flex-start">
        <Grid item sx={{ width: '100%', padding: 0 }}>
          <Paper>
            {cartItems && cartItems[0] && (
              <FormControl required variant="standard" sx={{ width: '100%', padding: 2 }}>
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
                        marginTop: 2,
                        marginBottom: 2,
                      }}
                    >
                      <Grid item xs={3}>
                        <Typography variant="subtitle2">{t('needPage.payTitle')}</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Divider sx={{ width: '95%' }} />
                      </Grid>
                    </Grid>
                    {!isSuccess && (
                      <Grid item>
                        <Grid item xs={12}>
                          <Donation setPercentage={setPercentage} amount={addedAmount} />
                          <Wallet
                            isCredit={isCredit}
                            setIsCredit={setIsCredit}
                            userCredit={userCredit}
                            setUserCredit={setUserCredit}
                          />
                        </Grid>
                        <Grid sx={{ textAlign: 'center' }}>
                          <LoadingButton
                            loading={isLoading || isPaying}
                            disabled={isDisabled}
                            variant="contained"
                            color="primary"
                            onClick={handlePopUp}
                          >
                            {!isLoading && (
                              <Typography
                                component="div"
                                variant="subtitle1"
                                sx={{
                                  color: 'white',
                                  display: 'contents',
                                }}
                              >
                                {!onlyWallet
                                  ? finalAmount.toLocaleString() + t('currency.toman')
                                  : t('button.payFromCredit')}
                              </Typography>
                            )}
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </form>
                <PaymentModal
                  open={modalOpen}
                  setOpen={setModalOpen}
                  handlePayment={handleCartCheck}
                />
              </FormControl>
            )}

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {(errorShaparakGate || errorUpdate || errorCartPayCheck) && (
                <Message
                  backError={errorShaparakGate || errorUpdate || errorCartPayCheck}
                  variant="standard"
                  severity="error"
                />
              )}
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {isSuccess &&
                cartCheckPayResult &&
                cartCheckPayResult.needs &&
                !cartCheckPayResult.needs[0] && (
                  <Message
                    backSuccess={successCartPayCheck}
                    severity="success"
                    variant="standard"
                  />
                )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
