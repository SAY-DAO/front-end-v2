import { Grid, Button, Typography } from '@mui/material';
import React from 'react';
import i18next from 'i18next';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: 'transparent',
    border: '1px solid #F59E39',
    borderRadius: '50%',
    fontWeight: 200,
    lineHeight: '19px',
    width: '36px',
    height: '36px',
    minWidth: 0,
    margin: 0,
    color: '#f05a31',
  },
});

const LangButton = () => {
  let lang;
  const getLanguage = () => i18next.language || window.localStorage.i18nextLng;

  const clickHandler = () => {
    const currentLang = getLanguage();

    switch (currentLang) {
      case 'en':
        lang = 'fa';
        break;
      case 'fa':
        lang = 'en';
        break;
      default:
        lang = 'fa';
    }

    i18next.changeLanguage(lang);
  };
  const classes = useStyles();
  return (
    <Grid container>
      <Button
        variant="outlined"
        className={classes.root}
        onClick={clickHandler}
      >
        <Typography color="primary" variant="subtitle2">
          {getLanguage() === 'en' ? 'FA' : 'EN'}
        </Typography>
      </Button>
    </Grid>
  );
};

export default LangButton;
