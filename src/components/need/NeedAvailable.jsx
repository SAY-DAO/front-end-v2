/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  OutlinedInput,
  FormControl,
} from '@mui/material';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Back from '../Back';
import Message from '../Message';
import NeedPageTop from './NeedPageTop';
import NeedPageProduct from './NeedPageProduct';
import Donation from '../payment/Donation';
import Wallet from '../payment/Wallet';
import { addToCart } from '../../actions/main/cartAction';
import { makePayment } from '../../actions/paymentAction';
import UnavailableModal from '../modals/UnavailableModal';
import { fetchChildOneNeed, fetchMyChildById } from '../../actions/childAction';
import { fetchUserDetails } from '../../actions/userAction';
import { SHAPARAK_RESET } from '../../constants/paymentConstants';

const useStyles = makeStyles({
  root: {
    top: 0,
    left: 0,
    right: 0,
    minHeight: '290px',
    backgroundRepeat: 'round',
    backgroundImage:
      'linear-gradient(to bottom,rgba(255, 255, 255, 0) 80%, #f7f7f7 100%),url("/images/child/background.png")',
    margin: 0,
    padding: 0,
  },

  needAvatar: {
    width: 100,
    height: 100,
    top: '20%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f9d6af',
    boxShadow: '4px 4px 10px rgba(0,0,0,.09)',
  },
  needName: {
    color: 'white',
    top: '31%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  sayName: {
    color: 'white',
    top: '34%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  needDesc: {
    color: '#8c8c8c',
    top: '40%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, 0%)',
    width: '100%',
    marginLeft: 2,
    marginRight: 2,
  },
});

export default function NeedAvailable({ childId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [windowReference, setWindowReference] = useState(false);
  const [method, setMethod] = useState('addToCart');
  const [amount, setAmount] = useState();
  const [unpayable, setUnpayable] = useState(false);
  const [paySomeDisable, setPaySomeDisable] = useState(false);
  const [bankMinDisable, setBankMinDisable] = useState(false);
  const [payLimit, setPayLimit] = useState('');
  const [inputError, setInputError] = useState(false);
  const [inputAmount, setInputAmount] = useState(1000);
  const [inCart, setInCart] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [donation, setDonation] = useState(0);
  const [userCredit, setUserCredit] = useState(0);
  const [isCredit, setIsCredit] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const [onlyWallet, setOnlyWallet] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { success: successUserDetails, error: errorUserDetails } = userDetails;

  const myChild = useSelector((state) => state.myChild);
  const { theChild } = myChild;

  const theCart = useSelector((state) => state.theCart);
  const { cartItems, loading: loadingCartItems } = theCart;

  const shaparakGate = useSelector((state) => state.shaparakGate);
  const {
    result,
    loading: loadingShaparakGate,
    success: successShaparakGate,
    error: errorShaparakGate,
  } = shaparakGate;

  const ChildOneNeed = useSelector((state) => state.ChildOneNeed);
  const {
    oneNeed,
    loading: loadingOneNeed,
    error: errorOneNeed,
    success: successOneNeed,
  } = ChildOneNeed;

  // login
  useEffect(() => {
    if (theChild && oneNeed) {
      dispatch(fetchUserDetails());
      if (errorUserDetails) {
        history.push(
          `/login?redirect=child/${theChild.id}/needs/${oneNeed.id}`
        );
      } else if (oneNeed.isDone && oneNeed.paid === oneNeed.cost) {
        history.push(`/child/${theChild.id}`);
      } else if (!successUserDetails) {
        dispatch(fetchUserDetails());
      }
    }
  }, [
    errorUserDetails,
    history,
    oneNeed,
    theChild,
    successUserDetails,
    dispatch,
    errorOneNeed,
  ]);

  // loading button
  useEffect(() => {
    if (
      loadingOneNeed ||
      loadingCartItems ||
      loadingShaparakGate ||
      successShaparakGate
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [
    loadingOneNeed,
    loadingCartItems,
    loadingShaparakGate,
    successShaparakGate,
  ]);

  // disable button
  useEffect(() => {
    if (successOneNeed && !unpayable) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [successOneNeed, amount, unpayable]);

  // In case the child is not in the state
  useEffect(() => {
    if (!theChild) {
      dispatch(fetchMyChildById(childId));
    }
  }, [theChild, childId]);

  // if Unpayable true can't pay
  useEffect(() => {
    setInputAmount(oneNeed.cost - oneNeed.paid); // when choosing pay some the initial input is set
    if (oneNeed) {
      setUnpayable(oneNeed.unpayable);
    }
  }, [oneNeed]);

  // do not allow paySome method when cost < 20000
  useEffect(() => {
    if (oneNeed) {
      if (oneNeed && oneNeed.cost >= 20000) {
        setPaySomeDisable(false);
      } else {
        setPaySomeDisable(true);
      }
    }
  }, [oneNeed]);

  // setError /bank minimum
  useEffect(() => {
    if (amount + userCredit < 1000) {
      setBankMinDisable(true);
      setInputError(true);
    } else {
      setInputError(false);
      setBankMinDisable(false);
    }
  }, [inputAmount, amount, userCredit]);

  // payLimit
  useEffect(() => {
    if (oneNeed && oneNeed.cost - oneNeed.paid < 2000) {
      setPayLimit((oneNeed.cost - oneNeed.paid).toString());
    }
    setPayLimit('1000');
  }, [oneNeed]);

  // set donation
  useEffect(() => {
    const theDonation =
      (percentage * amount) / 100 - (((percentage * amount) / 100) % 100);
    setDonation(theDonation);
  }, [percentage, amount]);

  // cart
  useEffect(() => {
    if (cartItems[0] && oneNeed) {
      const existItem = cartItems.find((x) => x.needId === oneNeed.id);
      if (existItem) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
  }, [cartItems, oneNeed]);

  // set amount
  useEffect(() => {
    setOnlyWallet(false);

    if (method === 'payAll') {
      const remaining = oneNeed.cost - oneNeed.paid;
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
    } else if (method === 'paySome') {
      setAmount(Number(inputAmount));
      if (isCredit) {
        if (userCredit < Number(inputAmount) + donation) {
          if (
            Number(inputAmount) + donation - userCredit > 0 &&
            Number(inputAmount) + donation - userCredit < 1000
          ) {
            setFinalAmount(1000); // for the button
          }
          if (Number(inputAmount) + donation - userCredit >= 1000) {
            setFinalAmount(Number(inputAmount) + donation - userCredit); // for the button
          }
        } else if (userCredit >= Number(inputAmount) + donation) {
          setFinalAmount(0); // for the button
          setOnlyWallet(true);
        }
      } else if (!isCredit) {
        setAmount(Number(inputAmount));
        setFinalAmount(Number(inputAmount) + donation); // for the button
      }
    } else if (method === 'addToCart') {
      setAmount(oneNeed.cost - oneNeed.paid);
    }
  }, [method, oneNeed, inputAmount, userCredit, donation, amount, isCredit]);

  // input
  useEffect(() => {
    if (
      oneNeed.cost - oneNeed.paid - Number(inputAmount) < 1000 &&
      oneNeed.cost - oneNeed.paid - Number(inputAmount) > 0
    ) {
      setInputAmount(oneNeed.cost - oneNeed.paid - 1000);
    }
    if (oneNeed.cost - oneNeed.paid <= Number(inputAmount)) {
      setInputAmount(oneNeed.cost - oneNeed.paid);
    }
  }, [inputAmount, userCredit, oneNeed]);

  // Shaparak gate  - redirect to bank - use gateway_payment_id to distinguish between cart payment
  useEffect(() => {
    if (successShaparakGate && (method === 'payAll' || method === 'paySome')) {
      if (windowReference) {
        // only wallet -status 299
        if (result.status === 299) {
          windowReference.document.write(result.response);
        } else {
          windowReference.document.write('loading...');
          windowReference.location = result.link;
        }
      }
      // Set a timeout for the above interval (10 Minutes)
      const doneNeedInterval = setInterval(
        () => dispatch(fetchChildOneNeed(oneNeed.id)),
        8000
      );
      setTimeout(() => clearInterval(doneNeedInterval), 60 * 10 * 1000);
      dispatch({ type: SHAPARAK_RESET });
    }
  }, [result, successShaparakGate, method]);

  // radio button / set method
  const handleMethodChange = (event) => {
    if (event.target.value === 'payAll') {
      setMethod('payAll');
    } else if (event.target.value === 'paySome') {
      setMethod('paySome');
    } else if (event.target.value === 'addToCart') {
      setMethod('addToCart');
    }
  };

  // paySome input
  const handlePaySomeInput = (e) => {
    setInputAmount(Number(e.target.value));
  };

  // addToCard
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(theChild, oneNeed, amount));
  };

  // addToCard
  const handleContinueShop = (e) => {
    e.preventDefault();
    history.push(`/child/${theChild.id}`, { childTab: 1 });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (amount >= parseInt(payLimit) && !unpayable) {
      const ref = window.open('', '_blank');
      setWindowReference(ref);

      console.log(`method = ${method}`);
      console.log(`amount = ${amount}`);
      console.log(`donation = ${donation}`);
      console.log(`useCredit = ${isCredit}`);

      dispatch(makePayment(method, oneNeed.id, amount, donation, isCredit));
    }
  };

  const classes = useStyles();
  return (
    <Grid container>
      <Grid container direction="column">
        {theChild && !oneNeed.isDone && (
          <Grid item xs={12} className={classes.root}>
            <Back
              isOrange={false}
              to={`/child/${childId}`}
              state={{ childTab: 1 }}
            />
            <Grid item xs={12}>
              <div style={{ minHeight: '350px' }} />
              <Avatar
                className={classes.needAvatar}
                alt={`${oneNeed.sayName}`}
                src={oneNeed.imageUrl}
              />
              <Typography className={classes.needName} variant="subtitle1">
                {oneNeed.name}
              </Typography>
              <Typography className={classes.sayName} variant="subtitle2">
                {theChild.sayName}
              </Typography>

              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.needDesc}
              >
                <Grid
                  item
                  xs={8}
                  sx={{
                    marginLeft: 3,
                    marginRight: 3,
                  }}
                >
                  <NeedPageTop oneNeed={oneNeed} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={8}
                  container
                  direction="row"
                  sx={{ marginTop: 5, padding: 2 }}
                >
                  <Grid item xs={3}>
                    <Typography variant="subtitle2">
                      {t('needPage.needInfo')}
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Divider sx={{ width: '95%', margin: 1 }} />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  <NeedPageProduct oneNeed={oneNeed} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={10}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: 5, padding: 0, textAlign: 'center' }}
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
                <Grid item xs={12} md={8} sx={{ margin: 1 }}>
                  <Typography variant="body2" sx={{ margin: 1 }}>
                    {t('needPage.payContent')}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    error={inputError}
                    required
                    component="fieldset"
                    variant="standard"
                    sx={{ width: '100%' }}
                    onSubmit={
                      !inCart && method === 'addToCart'
                        ? (e) => handleAddToCart(e)
                        : inCart
                        ? (e) => handleContinueShop(e)
                        : handlePayment
                    }
                  >
                    <form
                      style={{
                        width: '100%',
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                    >
                      <FormGroup>
                        <RadioGroup
                          name="controlled-radio-buttons-group"
                          value={method}
                          onChange={handleMethodChange}
                        >
                          <FormControlLabel
                            value="addToCart"
                            control={<Radio />}
                            label={t('needPage.addToCart')}
                            sx={{ margin: 0 }}
                          />
                          <FormControlLabel
                            disabled={inCart}
                            value="payAll"
                            control={<Radio />}
                            label={t('needPage.payAll')}
                            sx={{ margin: 0 }}
                          />
                          <FormControlLabel
                            disabled={paySomeDisable || inCart}
                            value="paySome"
                            control={<Radio />}
                            label={t('needPage.paySome')}
                            sx={{ margin: 0 }}
                          />
                        </RadioGroup>
                      </FormGroup>
                      {method === 'paySome' ? (
                        <>
                          <OutlinedInput
                            type="number"
                            id="filled-someAmount"
                            value={inputAmount}
                            onChange={handlePaySomeInput}
                            startAdornment={
                              <InputAdornment color="primary" position="start">
                                {t('currency.toman')}
                              </InputAdornment>
                            }
                          />
                          {inputError && (
                            <FormHelperText
                              id="outlined-paySome-helper-text"
                              sx={{ color: 'red', textAlign: 'center' }}
                            >
                              {t('needPage.payWarningModal', {
                                payLimit,
                              })}
                            </FormHelperText>
                          )}

                          <Grid item xs={12}>
                            <Divider
                              sx={{
                                width: '80%',
                                margin: 'auto',
                                marginTop: 3,
                                textAlign: 'center',
                              }}
                            />
                          </Grid>
                          <Donation
                            setPercentage={setPercentage}
                            amount={amount}
                          />
                          <Wallet
                            isCredit={isCredit}
                            setIsCredit={setIsCredit}
                            userCredit={userCredit}
                            setUserCredit={setUserCredit}
                          />
                          <Grid sx={{ textAlign: 'center' }}>
                            <LoadingButton
                              type="submit"
                              variant="contained"
                              color="primary"
                              disabled={isDisabled || bankMinDisable}
                              loading={isLoading}
                              sx={{ marginTop: 2, marginBottom: 4 }}
                            >
                              {!isLoading && (
                                <>
                                  {!isDisabled && !bankMinDisable && (
                                    <Typography
                                      component="span"
                                      variant="subtitle1"
                                      sx={{
                                        paddingRight: 2,
                                        paddingLeft: 2,
                                        color:
                                          isDisabled || bankMinDisable
                                            ? 'lightGrey'
                                            : 'white',
                                      }}
                                    >
                                      {!onlyWallet
                                        ? finalAmount.toLocaleString() +
                                          t('currency.toman')
                                        : t('button.payFromCredit')}
                                    </Typography>
                                  )}
                                  <Typography
                                    component="span"
                                    variant="subtitle1"
                                    sx={{
                                      color:
                                        isDisabled || bankMinDisable
                                          ? 'lightGrey'
                                          : 'white',
                                    }}
                                  >
                                    {!onlyWallet ? t('button.pay') : null}
                                  </Typography>
                                </>
                              )}
                            </LoadingButton>
                          </Grid>
                        </>
                      ) : (
                        <Grid>
                          {method === 'payAll' && (
                            <>
                              <Grid item xs={12}>
                                <Divider
                                  sx={{
                                    width: '80%',
                                    margin: 'auto',
                                    textAlign: 'center',
                                  }}
                                />
                              </Grid>
                              <Donation
                                setPercentage={setPercentage}
                                amount={amount}
                              />
                              <Wallet
                                isCredit={isCredit}
                                setIsCredit={setIsCredit}
                                userCredit={userCredit}
                                setUserCredit={setUserCredit}
                              />
                            </>
                          )}
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ textAlign: 'center' }}
                          >
                            <Grid item xs={12}>
                              <LoadingButton
                                type="submit"
                                variant={!inCart ? 'contained' : 'outlined'}
                                color="primary"
                                disabled={isDisabled}
                                loading={isLoading}
                                sx={{
                                  marginTop: 1,
                                  marginBottom: !inCart ? 4 : 2,
                                }}
                              >
                                {!isLoading && (
                                  <>
                                    <Typography
                                      component="span"
                                      variant="subtitle1"
                                      sx={{
                                        paddingRight: method === 'payAll' && 2,
                                        paddingLeft: 2,
                                        color:
                                          isDisabled || bankMinDisable
                                            ? 'lightGrey'
                                            : 'white',
                                      }}
                                    >
                                      {method === 'payAll' &&
                                      !onlyWallet &&
                                      finalAmount
                                        ? finalAmount.toLocaleString() +
                                          t('currency.toman')
                                        : method === 'payAll' && onlyWallet
                                        ? t('button.payFromCredit')
                                        : null}
                                    </Typography>
                                    <Typography
                                      component="div"
                                      variant="subtitle1"
                                      sx={{
                                        color:
                                          isDisabled || bankMinDisable
                                            ? 'lightGrey'
                                            : 'white',
                                        display: 'contents',
                                      }}
                                    >
                                      {method === 'payAll' && !onlyWallet ? (
                                        t('button.pay')
                                      ) : onlyWallet ? null : (
                                        <>
                                          <span
                                            style={{
                                              padding: 5,
                                              color: !inCart
                                                ? 'white'
                                                : '#fbb563',
                                            }}
                                          >
                                            {!inCart
                                              ? t('button.addToCart')
                                              : t('button.continueShopping')}
                                          </span>
                                          <span>
                                            {!inCart && (
                                              <img
                                                src="/images/cartWhite.svg"
                                                alt="Cart Icon"
                                                style={{
                                                  maxWidth: '22px',
                                                }}
                                              />
                                            )}
                                          </span>
                                        </>
                                      )}
                                    </Typography>
                                  </>
                                )}
                              </LoadingButton>
                              {inCart && (
                                <LoadingButton
                                  variant="contained"
                                  color="primary"
                                  disabled={isDisabled}
                                  loading={isLoading}
                                  sx={{ marginBottom: 4 }}
                                  onClick={() => history.push('/main/cart')}
                                >
                                  {t('button.goToCart')}
                                </LoadingButton>
                              )}
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              sx={{ textAlign: 'center', marginBottom: 2 }}
                            >
                              {(errorOneNeed || errorShaparakGate) && (
                                <Message
                                  backError={errorOneNeed || errorShaparakGate}
                                  variant="standard"
                                  severity="error"
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </form>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Unavailable need warn popup */}
        <UnavailableModal unpayable={unpayable} setUnpayable={setUnpayable} />
      </Grid>
    </Grid>
  );
}

NeedAvailable.propTypes = {
  childId: PropTypes.string,
};
