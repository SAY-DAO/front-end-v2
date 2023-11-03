import React, { useState, useEffect } from 'react';
import {
  Grid,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
  FormHelperText,
  Switch,
  FormControlLabel,
  Dialog,
  DialogContent,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import PhoneInput from 'react-phone-input-2';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Message from '../Message';
import {
  CHECK_CONTACT_RESET,
  CHECK_USERNAME_RESET,
  USER_RESET_PASSWORD_RESET,
  USER_UPDATE_PROFILE_RESET,
  USER_VERIFY_RESET,
} from '../../redux/constants/main/userConstants';
import {
  checkContactBeforeVerify,
  checkUserNameBeforeVerify,
  fetchEmailMarketingStatus,
  fetchUserDetails,
  updateEmailMarketingStatus,
  userEditProfile,
} from '../../redux/actions/userAction';
import validateEmail from '../../inputsValidation/validateEmail';
import validatePhone from '../../inputsValidation/validatePhone';
import validateUsername from '../../inputsValidation/validateUsername';
import '../../resources/styles/css/material.css';
import ProfileUpload from './ProfileUpload';

const ProfileEdit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [validateErr, setValidateErr] = useState('');
  const [userNameErr, setUserNameErr] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [emailAuth, setEmailAuth] = useState(true);
  const [phoneAuth, setPhoneAuth] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  // const [dialCode, setDialCode] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [uploadAvatar, setUploadAvatar] = useState();
  const [finalAvatarFile, setFinalAvatarFile] = useState();
  const [openImageDialog, setOpenImageDialog] = useState(false);

  const [checked, setChecked] = React.useState(true);

  const checkContact = useSelector((state) => state.checkContact);
  const { loading: loadingCheck, error: errorCheck, success: successCheck } = checkContact;

  const checkUserName = useSelector((state) => state.checkUserName);
  const { loading: loadingCheckUSerName, error: errorCheckUserName } = checkUserName;

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { updatedUser, loading: loadingUpdate } = userUpdateProfile;

  const userEmailMarketing = useSelector((state) => state.userEmailMarketing);
  const { emailMarketing, updatedEmailStatus, loading: loadingEmailStatus } = userEmailMarketing;

  useEffect(() => {
    dispatch({ type: USER_RESET_PASSWORD_RESET });
    if (!theUser && !userInfo) {
      navigate('/auth/login?redirect=main/profile/edit');
    }
  }, [theUser, userInfo]);

  useEffect(() => {
    dispatch(fetchEmailMarketingStatus());
  }, [updatedEmailStatus]);

  // Success
  useEffect(() => {
    if (updatedUser) {
      dispatch(fetchUserDetails());
      if (updatedUser && theUser) {
        navigate('/main/profile');
        const localUser = JSON.parse(localStorage.getItem('userInfo'));
        const newData = localUser;
        window.localStorage.removeItem('userInfo');
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            accessToken: newData.accessToken,
            message: 'updated profile',
            refreshToken: newData.refreshToken,
            user: updatedUser,
          }),
        );
      }
    }
    return () => {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    };
  }, [updatedUser, theUser]);

  // loading IconButton
  useEffect(() => {
    if (loadingCheck || loadingUpdate) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingCheck, loadingUpdate]);

  // disable IconButton
  useEffect(() => {
    if (errorCheck || !theUser) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [successCheck, theUser]);

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
    if (theUser && theUser.phoneNumber) {
      setPhoneAuth(true);
      setEmailAuth(false);
    }
    if (theUser && theUser.emailAddress) {
      setEmailAuth(true);
      setPhoneAuth(false);
    }
  }, [theUser]);

  // set the back-end data
  useEffect(() => {
    if (theUser) {
      setFirstName(theUser.firstName);
      setLastName(theUser.lastName);
      setPhoneNumber(theUser.phone_number);
      setEmail(theUser.emailAddress);
      setUserName(theUser.userName);
      setImageUrl(theUser.avatarUrl);
    }
  }, [theUser]);

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
      if (!phoneResult && phoneNumber && userInfo.user.phone_number !== phoneNumber) {
        setValidateErr('');
        const timeout = setTimeout(() => {
          dispatch(checkContactBeforeVerify('phone_number', phoneNumber, countryCode));
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
      if (!emailResult && email && userInfo.user.emailAddress !== email) {
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
    if (userName) {
      const result = validateUsername(userName);
      if (result && result.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(result.errorMessage));
        }, 1000);
        return () => clearTimeout(timeout);
      }
      if (!result.errorMessage && userName && userName !== theUser.userName) {
        const timeout = setTimeout(() => {
          setUserNameErr(false);
          dispatch(checkUserNameBeforeVerify(userName));
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
    setUserNameErr(false);
  }, [userName]);

  useEffect(() => {
    if (emailMarketing) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [emailMarketing]);

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
    // setDialCode(data.dialCode);
  };

  // user name changes
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(
      phoneAuth,
      emailAuth,
      finalAvatarFile,
      firstName,
      lastName,
      phoneNumber,
      email,
      userName,
    );
    e.preventDefault();
    dispatch(
      userEditProfile(
        phoneAuth,
        emailAuth,
        finalAvatarFile,
        firstName,
        lastName,
        phoneNumber,
        email,
        userName,
      ),
    );
  };

  // dialog image
  const handleImageClickOpen = () => {
    setOpenImageDialog(true);
  };

  const handleImageClose = () => {
    setOpenImageDialog(false);
  };

  const onAvatarChange = (e) => {
    if (e.target.files[0]) {
      setUploadAvatar(e.target.files[0]);
      handleImageClickOpen();
    }
  };

  const handleChange = () => {
    dispatch(updateEmailMarketingStatus());
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" maxWidth>
      <FormControl onSubmit={handleSubmit} variant="outlined" sx={{ width: '100%' }}>
        <form style={{ width: '100%' }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            item
            spacing={1}
          >
            <Grid item container justifyContent="center" alignItems="center">
              <Grid
                item
                xs={4}
                sx={{
                  textAlign: 'center',
                }}
              >
                <IconButton onClick={() => navigate('/main/profile')}>
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
              </Grid>
              <Grid item xs={4}>
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
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  textAlign: 'center',
                }}
              >
                <IconButton disabled={isDisabled || !userName} type="submit">
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
            </Grid>
            <Grid item>
              <div className="upload__image-wrapper">
                <Grid
                  sx={{
                    position: 'relative',
                  }}
                >
                  <Avatar
                    alt="avatar"
                    sx={{ width: 110, height: 110 }}
                    src={finalAvatarFile ? URL.createObjectURL(finalAvatarFile) : imageUrl}
                  />
                  <label htmlFor="upload-image-avatar">
                    <input
                      accept="image/*"
                      id="upload-image-avatar"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => onAvatarChange(e)}
                    />
                    <IconButton
                      name="upload-image-avatar"
                      id="upload-image-avatar"
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
                    <InputAdornment sx={{ fontWeight: 400 }} position="start">
                      {t('placeholder.name')}:
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
                    <InputAdornment sx={{ fontWeight: 400 }} position="start">
                      {t('placeholder.lastName')}:
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <PhoneInput
                style={{
                  direction: 'ltr',
                  width: '100%',
                }}
                specialLabel={t('placeholder.phoneNumber')}
                country="ir"
                disabled={phoneAuth}
                value={phoneNumber || 0}
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
                  value={email || ''}
                  onChange={handleChangeEmail}
                  startAdornment={
                    <InputAdornment sx={{ fontWeight: 400 }} position="start">
                      {t('placeholder.email')}:
                    </InputAdornment>
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
                    <InputAdornment sx={{ fontWeight: 400 }} position="start">
                      {t('placeholder.userName')}:
                    </InputAdornment>
                  }
                />
                {!loadingCheckUSerName && errorCheckUserName ? (
                  <FormHelperText id="component-error-text">
                    {errorCheckUserName.data.message}
                  </FormHelperText>
                ) : (
                  loadingCheckUSerName && (
                    <CircularProgress
                      sx={{ width: '10px !important', height: '10px !important' }}
                    />
                  )
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', textAlign: 'center' }}>
              <FormControlLabel
                sx={{ width: 250 }}
                control={
                  <Switch
                    disabled={loadingEmailStatus}
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={t('email.monthlySummaries')}
              />
            </Grid>
          </Grid>
        </form>
        {/*  Image */}
        {uploadAvatar && (
          <Dialog
            open={openImageDialog}
            onClose={handleImageClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent sx={{ p: 2 }}>
              <ProfileUpload
                uploadImage={uploadAvatar}
                handleImageClose={handleImageClose}
                setFinalImageFile={setFinalAvatarFile}
                setUploadAvatar={setUploadAvatar}
              />
            </DialogContent>
          </Dialog>
        )}
      </FormControl>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        {(validateErr || errorCheck) && (
          <Message input={messageInput} backError={errorCheck} variant="standard" severity="error">
            {validateErr}
          </Message>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileEdit;
