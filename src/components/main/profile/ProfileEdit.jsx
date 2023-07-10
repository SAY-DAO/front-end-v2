/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Grid, Avatar, Typography, IconButton, CircularProgress } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import PhoneInput from 'react-phone-input-2';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Message from '../../Message';
import {
  CHECK_CONTACT_RESET,
  CHECK_USERNAME_RESET,
  USER_UPDATE_PROFILE_RESET,
  USER_VERIFY_RESET,
} from '../../../constants/main/userConstants';
import {
  checkContactBeforeVerify,
  checkUserNameBeforeVerify,
  userEditProfile,
} from '../../../actions/userAction';
import validateEmail from '../../../inputsValidation/validateEmail';
import validatePhone from '../../../inputsValidation/validatePhone';
import validateUsername from '../../../inputsValidation/validateUsername';

const ProfileEdit = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [validateErr, setValidateErr] = useState('');
  const [userNameErr, setUserNameErr] = useState(false);
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
  const [uploadImage, setUploadImage] = useState();

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser, success: successUserDetails } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUserUpdate, error: errorUserUpdate } = userUpdateProfile;

  const checkContact = useSelector((state) => state.checkContact);
  const { loading: loadingCheck, error: errorCheck } = checkContact;

  useEffect(() => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET });

    if (!theUser && !successUserDetails) {
      history.push('/login?redirect=main/profile/edit');
    }
  }, [theUser, successUserDetails, history]);

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
    if (errorCheck || !successUserDetails) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [errorCheck, successUserDetails, theUser]);

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
    if (theUser && theUser.is_phonenumber_verified) {
      setPhoneAuth(true);
      setEmailAuth(false);
    }
    if (theUser && theUser.is_email_verified) {
      setEmailAuth(true);
      setPhoneAuth(false);
    }
  }, [successUserDetails, theUser]);

  // set the back-end data
  useEffect(() => {
    if (theUser) {
      setFirstName(theUser.firstName);
      setLastName(theUser.lastName);
      if (theUser.phone_number) {
        setPhoneNumber(theUser.phone_number);
      } else {
        setEmail(theUser.emailAddress);
      }
      setUserName(theUser.userName);
      if (!uploadImage) {
        setImageUrl(theUser.avatarUrl);
      }
    }
  }, [theUser]);

  // check phone every 1000 ms when typing
  useEffect(() => {
    if (!phoneAuth && theUser.phone_number !== phoneNumber) {
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
          dispatch(checkContactBeforeVerify('phone_number', phoneNumber, countryCode));
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [phoneNumber, countryCode, phoneAuth, dispatch]);

  // check email every 1000 ms when typing
  useEffect(() => {
    if (!emailAuth && theUser.emailAddress !== email) {
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

  // check userName every 1000 ms when typing
  useEffect(() => {
    setValidateErr('');
    setUserNameErr(true);
    dispatch({ type: CHECK_USERNAME_RESET });
    if (userName && theUser.userName !== userName) {
      const result = validateUsername(userName);
      if (result && result.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(result.errorMessage));
        }, 1000);
        return () => clearTimeout(timeout);
      }
      if (!result.errorMessage && userName) {
        const timeout = setTimeout(() => {
          setUserNameErr(false);
          dispatch(checkUserNameBeforeVerify(userName));
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
    setUserNameErr(false);
  }, [userName]);

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

  const onImageChange = (e) => {
    if (e.target.files[0]) {
      setUploadImage(e.target.files);
      setImageUrl(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userEditProfile(
        phoneAuth,
        emailAuth,
        location.state && location.state.newImage, // from ProfileUpload.jsx
        firstName,
        lastName,
        phoneNumber,
        email,
        userName,
      ),
    );
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" maxWidth>
      {/*  when uploaded route to editing studio */}
      {uploadImage && (
        <Redirect
          to={{
            pathname: '/main/profile/upload',
            state: { imageUpload: uploadImage[0] },
          }}
        />
      )}
      <FormControl onSubmit={handleSubmit} variant="outlined" sx={{ width: '100%' }}>
        <form style={{ width: '100%' }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            item
            spacing={2}
          >
            <Grid item container justifyContent="space-between" alignItems="center">
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
              <div className="upload__image-wrapper">
                <Grid
                  sx={{
                    position: 'relative',
                  }}
                >
                  <Avatar
                    alt="user photo"
                    sx={{ width: 140, height: 140 }}
                    src={
                      location.state && location.state.newImage
                        ? URL.createObjectURL(location.state.newImage) // image preview
                        : imageUrl
                    }
                  />
                  <label htmlFor="upload-image">
                    <input
                      accept="image/*"
                      id="upload-image"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={onImageChange}
                    />

                    <IconButton
                      name="upload-image"
                      id="upload-image"
                      color="primary"
                      component="div"
                      sx={{
                        width: '100%',
                        position: 'absolute',
                        bottom: '-20px',
                      }}
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
                  </label>
                </Grid>
              </div>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <OutlinedInput
                  id="outlined-adornment-firstName"
                  type="text"
                  value={firstName}
                  onChange={handleChangeFirstName}
                  startAdornment={
                    <InputAdornment position="start">{t('placeholder.name')}</InputAdornment>
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
                    <InputAdornment position="start">{t('placeholder.lastName')}</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <PhoneInput
                disabled={phoneAuth}
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
                    <InputAdornment position="start">{t('placeholder.email')}</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <OutlinedInput
                  error={userNameErr}
                  id="outlined-adornment-userName"
                  type="text"
                  value={userName}
                  onChange={handleChangeUserName}
                  startAdornment={
                    <InputAdornment position="start">{t('placeholder.userName')}</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </FormControl>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        {(validateErr || errorCheck || errorUserUpdate) && (
          <Message
            input={messageInput}
            backError={errorCheck || errorUserUpdate}
            variant="standard"
            severity="error"
          >
            {validateErr}
          </Message>
        )}
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        {successUserUpdate && (
          <Message severity="success" variant="standard">
            {t('profileUpdate.success')}
          </Message>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileEdit;
