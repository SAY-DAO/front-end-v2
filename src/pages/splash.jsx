/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../resources/styles/css/splash.css';

export default function Splash() {
  const navigate = useNavigate();

  const [isDone, setIsDone] = useState(false);
  const [values, setValues] = useState();

  const timer = (ms) =>
    setTimeout(() => {
      navigate('/main/offlineHome');
      // navigate('/auth/intro');
    }, ms);

  const tick = () => {
    if (values) {
      const i = values.loopNum % values.toRotate.length;
      const fullTxt = values.toRotate[i];

      if (values.isDeleting) {
        values.txt = fullTxt.substring(0, values.txt.length - 1);
      } else {
        values.txt = fullTxt.substring(0, values.txt.length + 1);
      }

      values.el.innerHTML = `<span class="wrap">${values.txt}</span>`;

      let delta = 700 - Math.random() * 100;

      if (values.isDeleting) {
        delta /= 2;
      }
      if (!values.isDeleting && values.txt === fullTxt) {
        delta = values.period;
        values.isDeleting = true;
      } else if (values.isDeleting && values.txt === '') {
        values.isDeleting = false;
        values.loopNum++;
        delta = 500;
      }

      setTimeout(() => {
        tick();
      }, delta);
    }
  };

  useEffect(() => {
    const elements = document.getElementsByClassName('txt-rotate');
    if (!isDone && elements && elements[0]) {
      for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
          setValues({
            toRotate: JSON.parse(toRotate),
            el: elements[i],
            loopNum: 0,
            period: parseInt(period, 10) || 2000,
            txt: '',
            isDeleting: false,
          });
        }
      }
      // INJECT CSS
      const css = document.createElement('style');
      css.type = 'text/css';
      css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #cdc9c2 }';
      document.body.appendChild(css);
      setIsDone(true);
    }
  }, [document]);

  useEffect(() => {
    if (values) {
      tick();
      timer(3000);
    }
  }, [values]);

  return (
    <Grid
      container
      sx={{ backgroundColor: '#F7F7F7', color: '#a1a1a1', height: '100vh', textAlign: 'center' }}
    >
      <h1 style={{ margin: 'auto' }}>
        SAY
        <span className="txt-rotate" data-period="20000" data-rotate='[ " DAO" ]' />
      </h1>
    </Grid>
  );
}
