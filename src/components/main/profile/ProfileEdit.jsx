/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import FormControl from '@material-ui/core/FormControl';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import PhoneInput from 'react-phone-input-2';
import ImageUploading from 'react-images-uploading';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Message from '../../Message';
import {
  CHECK_CONTACT_RESET,
  USER_RESET_PASSWORD_RESET,
  USER_VERIFY_RESET,
} from '../../../constants/main/userConstants';
import { checkContactBeforeVerify } from '../../../actions/userAction';
import validateEmail from '../../../inputsValidation/validateEmail';
import validatePhone from '../../../inputsValidation/validatePhone';

const ProfileEdit = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [validateErr, setValidateErr] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [emailAuth, setEmailAuth] = useState(true);
  const [phoneAuth, setPhoneAuth] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const checkContact = useSelector((state) => state.checkContact);
  const {
    loading: loadingCheck,
    error: errorCheck,
    success: successCheck,
  } = checkContact;

  useEffect(() => {
    dispatch({ type: USER_RESET_PASSWORD_RESET });
    if (!userInfo && !successLogin) {
      history.push('/login?redirect=main/profile/edit');
    }
  }, [userInfo, successLogin, history]);

  // loading IconButton
  useEffect(() => {
    if (loadingCheck) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingCheck]);

  // disable IconButton
  useEffect(() => {
    if (!successCheck || successLogin) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [successCheck, successLogin]);

  //  clear error message when type
  useEffect(() => {
    dispatch({ type: CHECK_CONTACT_RESET });
    dispatch({ type: USER_VERIFY_RESET });
  }, [email, phoneNumber, dispatch]);

  // Message input for 422 status error
  useEffect(() => {
    if (!emailAuth && email) {
      setMessageInput('email');
    }
    if (!phoneAuth && phoneNumber) {
      setMessageInput('phoneNumber');
    }
  }, [email, phoneNumber, phoneAuth, emailAuth]);

  // email / phone user authenticated
  useEffect(() => {
    if (userInfo && userInfo.user.phoneNumber) {
      setPhoneAuth(true);
      setEmailAuth(false);
    }
    if (userInfo && userInfo.user.emailAddress) {
      setEmailAuth(true);
      setPhoneAuth(false);
    }
  }, [successLogin, userInfo]);

  // set the back-end data
  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.user.firstName);
      setLastName(userInfo.user.lastName);
      setPhoneNumber(userInfo.user.phoneNumber);
      setEmail(userInfo.user.emailAddress);
      setUserName(userInfo.user.userName);
      setImageUrl(userInfo.user.avatarUrl);
    }
  }, [userInfo]);

  // check phone every 1000 ms when typing
  useEffect(() => {
    if (!phoneAuth && phoneNumber) {
      setValidateErr('');
      const phoneResult = validatePhone(phoneNumber, countryCode);
      if (phoneResult && phoneResult.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(phoneResult.errorMessage));
        }, 1000);
        return () => clearTimeout(timeout);
      }
      if (!phoneResult && phoneNumber) {
        setValidateErr('');
        const timeout = setTimeout(() => {
          dispatch(
            checkContactBeforeVerify('phone_number', phoneNumber, countryCode)
          );
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [phoneNumber, countryCode, phoneAuth, dispatch, t]);

  // check email every 1000 ms when typing
  useEffect(() => {
    if (!emailAuth && email) {
      setValidateErr('');
      const emailResult = validateEmail(email);
      if (emailResult && emailResult.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(emailResult.errorMessage));
        }, 1000);
        return () => clearTimeout(timeout);
      }
      if (!emailResult && email) {
        const timeout = setTimeout(() => {
          dispatch(checkContactBeforeVerify('email', email));
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [email, emailAuth, dispatch, t]);

  // Success
  useEffect(() => {
    if (successCheck) {
      history.push('main/profile/settings');
    }
  }, [successCheck, history]);

  // first name changes
  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  // last name changes
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  // email changes
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  // phone changes
  const handleChangePhoneNumber = (input, data, event, formattedValue) => {
    setPhoneNumber(formattedValue);
    setCountryCode(data.countryCode);
    setDialCode(data.dialCode);
  };

  // user name changes
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      <FormControl
        onSubmit={handleSubmit}
        variant="outlined"
        sx={{ width: '100%' }}
      >
        <form style={{ width: '100%' }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            item
            spacing={2}
          >
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton onClick={() => history.push('/main/profile')}>
                <CloseIcon
                  sx={{
                    color: 'red',
                    top: 0,
                    right: 0,
                    width: '24px',
                    margin: '18px',
                    zIndex: 10,
                  }}
                />
              </IconButton>

              <Typography
                variant="h6"
                sx={{
                  padding: 2,
                  fontWeight: 'lighter',
                  textAlign: 'center',
                }}
              >
                {t('profile.editProfile.title')}
              </Typography>
              <IconButton disabled={isDisabled} type="submit">
                {isLoading ? (
                  <CircularProgress
                    size={20}
                    sx={{
                      top: 0,
                      left: 0,
                      width: '24px',
                      margin: '18px',
                      zIndex: 10,
                    }}
                  />
                ) : (
                  <DoneIcon
                    sx={{
                      color: isDisabled ? 'gray' : 'green',
                      top: 0,
                      left: 0,
                      width: '24px',
                      margin: '18px',
                      zIndex: 10,
                    }}
                  />
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                style={{
                  width: 140,
                  height: 140,
                  border: '1px solid gray',
                  borderRadius: '100%',
                }}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    {imageList[0] ? (
                      <Grid
                        sx={{
                          position: 'relative',
                        }}
                      >
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <Avatar
                              alt="user photo"
                              sx={{ width: 140, height: 140 }}
                              src={image.data_url}
                            />
                          </div>
                        ))}
                        <IconButton
                          sx={{
                            width: '100%',
                            color: isDragging ? 'red' : undefined,
                            position: 'absolute',
                            bottom: '-20px',
                          }}
                          onClick={onImageRemoveAll}
                        >
                          <HighlightOffIcon
                            fontSize="large"
                            sx={{
                              borderRadius: '20%',
                              backgroundColor: 'white',
                              color: 'red',
                            }}
                          />
                        </IconButton>
                      </Grid>
                    ) : (
                      <Grid
                        sx={{
                          position: 'relative',
                        }}
                      >
                        <Avatar
                          alt="user photo"
                          sx={{ width: 140, height: 140 }}
                          src={imageUrl}
                        />
                        <IconButton
                          sx={{
                            width: '100%',
                            color: isDragging ? 'red' : undefined,
                            position: 'absolute',
                            bottom: '-20px',
                          }}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <CameraAltOutlinedIcon
                            color="primary"
                            fontSize="large"
                            sx={{
                              borderRadius: '20%',
                              backgroundColor: 'white',
                            }}
                          />
                        </IconButton>
                      </Grid>
                    )}
                  </div>
                )}
              </ImageUploading>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <OutlinedInput
                  id="outlined-adornment-firstName"
                  type="text"
                  value={firstName}
                  onChange={handleChangeFirstName}
                  startAdornment={
                    <InputAdornment position="start">
                      {t('placeholder.name')}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <OutlinedInput
                  id="outlined-adornment-lastName"
                  type="text"
                  value={lastName}
                  onChange={handleChangeLastName}
                  startAdornment={
                    <InputAdornment position="start">
                      {t('placeholder.lastName')}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <PhoneInput
                style={{
                  direction: 'ltr',
                  display: phoneAuth ? 'none' : null,
                }}
                specialLabel={t('placeholder.phoneNumber')}
                country="ir"
                value={phoneNumber}
                disableDropdown="false"
                onChange={handleChangePhoneNumber}
                inputProps={{
                  name: 'phone',
                }}
                defaultMask="... ... .. ..."
                countryCodeEditable={false}
              />
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <OutlinedInput
                  disabled={emailAuth}
                  id="outlined-adornment-email"
                  type="email"
                  value={email}
                  onChange={handleChangeEmail}
                  startAdornment={
                    <InputAdornment position="start">
                      {t('placeholder.email')}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <OutlinedInput
                  id="outlined-adornment-userName"
                  type="text"
                  value={userName}
                  onChange={handleChangeUserName}
                  startAdornment={
                    <InputAdornment position="start">
                      {t('placeholder.userName')}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </FormControl>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        {(validateErr || errorCheck) && (
          <Message
            input={messageInput}
            backError={errorCheck}
            variant="filled"
            severity="error"
          >
            {validateErr}
          </Message>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileEdit;
