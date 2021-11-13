import { Grid, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
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
  const [lang, setLang] = useState('');
  const getLanguage = () => i18next.language || window.localStorage.i18nextLng;

  const currentLang = getLanguage();
  const elem = document.getElementById('direction');
  const attr = elem.attributes;

  useEffect(() => {
    console.log(attr.dir.value);
    if (!attr.dir.value && currentLang) {
      if (lang === 'fa') {
        attr.dir.value = 'rtl';
      } else {
        attr.dir.value = 'ltr';
      }
    }
    i18next.changeLanguage(lang);
  }, [lang]);

  const clickHandler = async () => {
    console.log(lang);
    console.log(currentLang);
    switch (await currentLang) {
      case 'en':
        setLang('fa');
        attr.dir.value = 'rtl';
        break;
      case 'fa':
        setLang('en');
        attr.dir.value = 'ltr';
        break;
      default:
        setLang('fa');
        attr.dir.value = 'rtl';
    }
    console.log(attr.dir);
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
