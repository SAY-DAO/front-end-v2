import { Grid, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import i18next from 'i18next';

const LangButton = () => {
  const [lang, setLang] = useState('');
  const getLanguage = () => i18next.language || window.localStorage.i18nextLng;

  const currentLang = getLanguage();
  const elem = document.getElementById('direction');
  const attrs = elem.attributes;

  useEffect(() => {
    if (!attrs.dir.value && currentLang) {
      if (lang === 'fa') {
        elem.setAttribute('dir', 'rtl');
      } else {
        elem.setAttribute('dir', 'ltr');
      }
    }
    i18next.changeLanguage(lang);
  }, [lang, attrs, currentLang, elem]);

  const clickHandler = async () => {
    switch (await currentLang) {
      case 'en':
        setLang('fa');
        attrs.dir.value = 'rtl';
        break;
      case 'fa':
        setLang('en');
        attrs.dir.value = 'ltr';
        break;
      default:
        setLang('fa');
        attrs.dir.value = 'rtl';
    }
  };

  return (
    <Grid container>
      <Button
        variant="outlined"
        sx={{
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
        }}
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
