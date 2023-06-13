import React, { useState, useEffect } from 'react';
import Sound from 'react-sound';
import { withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

// from material-ui customized slider
const PrettoSlider = withStyles({
  root: {
    width: '95%',
    color: '#fff',
    height: 8,
    left: '5px',
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    // marginTop: -4,
    marginLeft: -6,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
    display: 'none',
  },
  track: {
    left: '0 !important',
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function VoiceBar({ url }) {
  const [status, setStatus] = useState('STOPPED');
  const [autoLoad, setAutoLoad] = useState(false);
  const [sound, setSound] = useState();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const theSound = soundManager.getSoundById(soundManager.soundIDs[0]);
    setSound(theSound);
    return () => {
      setStatus('STOPPED');
      setSound('');
    };
  }, []);

  const timeHandler = () => {
    const w = document.getElementsByClassName('MuiSlider-track')[0].style.width;
    const newTime = (w.split('%')[0] / 100) * sound.duration;
    // this.setState({ from: newTime });
    sound.setPosition(newTime);
  };

  const handleChange = () => {
    const p = document.getElementById('demo');
    // let pb = document.getElementById("pb1");
    if (sound != null && p != null) {
      const theInterval = setInterval(() => {
        let s = Math.floor(sound.position);
        let d = Math.floor(sound.duration);

        const percent = (s / d) * 100;
        // pb.style.width = percent.toString() + "%";

        try {
          document.getElementsByClassName(
            'MuiSlider-track'
          )[0].style.width = `${percent.toString()}%`;
          document.getElementsByClassName(
            'MuiSlider-thumb'
          )[0].style.left = `${percent.toString()}%`;
        } catch (error) {
          clearInterval(theInterval);
        }

        const ms = s % 1000;
        const msd = d % 1000;
        s = (s - ms) / 1000;
        d = (d - msd) / 1000;
        const secs = s % 60;
        const secsd = d % 60;
        s = (s - secs) / 60;
        d = (d - secsd) / 60;
        const mins = s % 60;
        const minsd = d % 60;
        p.innerHTML = `${mins}:${secs}/${minsd}:${secsd}`;
      }, 1000);
    }
  };

  const voiceChangeStatus = () => {
    console.warn('hey!');
    if (status === 'PAUSED' || status === 'STOPPED') {
      setStatus('PLAYING');
      setAutoLoad(true);
    } else {
      setStatus('PAUSED');
      setAutoLoad(false);
    }
  };

  return (
    <div style={{ direction: 'ltr' }}>
      {url && (
        <>
          <Sound
            url={url}
            playStatus={status}
            // playFromPosition={from}
            autoLoad={autoLoad}
            onLoad={handleChange}
            onBufferChange={handleChange}
            onFinishedPlaying={() => {
              setStatus('PAUSED');
              setAutoLoad(false);
            }}
          />

          <div className="player">
            <IconButton
              aria-label="delete"
              sx={{ color: 'white' }}
              onClick={voiceChangeStatus}
              size="medium"
            >
              {status === 'PLAYING' ? <PauseCircleIcon /> : <PlayCircleIcon />}
            </IconButton>
            <div className="progressBarNew">
              {/* <div className="progressBarNewAll"></div>
              <div id="pb1" className="progressBarNewDone"></div> */}
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={0}
                onChange={timeHandler}
                onClick={timeHandler}
              />
            </div>
            <p id="demo" className="progressBarTime" />
          </div>
        </>
      )}
    </div>
  );
}

VoiceBar.propTypes = {
  url: PropTypes.string.isRequired,
};
