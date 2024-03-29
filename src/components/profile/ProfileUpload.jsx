/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, IconButton, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const PrettoSlider = withStyles({
  root: {
    color: '#f59e39',
    height: 8,
  },
  thumb: {
    top: '50%',
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

// eslint-disable-next-line react/prop-types
export default function ProfileUpload({ uploadImage, handleImageClose, setFinalImageFile }) {
  const { t } = useTranslation();
  const location = useLocation();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [editor, setEditor] = useState(null);
  const [file, setFile] = useState();

  const setEditorRef = (thisEditor) => setEditor(thisEditor);

  // disable IconButton
  useEffect(() => {
    if (!uploadImage) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [location]);

  useEffect(() => {
    setFile(uploadImage);
  }, []);

  const scaleHandler = () => {
    const w = document.getElementsByClassName('MuiSlider-track')[0].style.width;
    const newScale = 1 + w.split('%')[0] / 100;
    setScale(newScale);
  };

  const rotateHandler = () => {
    const w = document.getElementsByClassName('MuiSlider-track')[1].style.width;
    const newRotate = (w.split('%')[0] * 360) / 100;
    setRotate(newRotate);
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const onClickSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (editor) {
      const canvas = editor.getImageScaledToCanvas().toDataURL('image/png');

      // const i = canvas.indexOf("base64,");
      // const buffer = Buffer.from(canvas.slice(i + 7), "base64");
      const name = `${Math.random().toString(36).slice(-5)}.png`;
      // const file = new File(buffer, name);

      const theFile = dataURLtoFile(canvas, name);

      console.warn('editor --> ', typeof editor);
      console.warn('converted png --> ', canvas);
      console.warn('canvas type --> ', typeof canvas);
      console.warn('test png file --> ', theFile);
      console.warn('uploaded file --> ', file);

      // navigate('/main/profile/edit', { newImage: theFile });
      // setThumb(canvas);
      setFinalImageFile(theFile);
      handleImageClose(); // close dialog

      setIsLoading(false);
    }
  };

  return (
    <Grid container>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item xs={4}>
          {isLoading ? (
            <CircularProgress
              size={20}
              sx={{
                top: 0,
                left: 0,
                width: '20px',
                margin: '18px',
                zIndex: 10,
              }}
            />
          ) : (
            <IconButton onClick={onClickSave}>
              <DoneIcon
                sx={{
                  color: isDisabled ? 'gray' : 'green',
                  top: 0,
                  left: 0,
                  width: '20px',
                  margin: '18px',
                  zIndex: 10,
                }}
              />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={4}>
          <Typography
            sx={{
              fontWeight: 'lighter',
              textAlign: 'center',
            }}
          >
            {t('profile.editProfile.avatar.title')}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => handleImageClose()}>
            <CloseIcon
              sx={{
                color: 'red',
                top: 0,
                right: 0,
                width: '20px',
                margin: '18px',
                zIndex: 10,
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container sx={{ margin: 2 }}>
        <div className="setting body-content flex-col al-center">
          <AvatarEditor
            image={file}
            width={window.innerWidth - 100}
            height={window.innerWidth - 100}
            ref={setEditorRef}
            border={50}
            borderRadius={1000}
            scale={scale}
            rotate={rotate}
            style={{ maxWidth: '100%', height: 'auto' }}
          />

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ margin: 'auto', marginLeft: 1, marginRight: 1 }}>
              {t('profile.editProfile.avatar.scale')}
            </Typography>
            <div className="flex-row" style={{ width: '100%' }}>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={100}
                onChange={scaleHandler}
                onClick={scaleHandler}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ margin: 'auto', marginLeft: 1, marginRight: 1 }}>
              {t('profile.editProfile.avatar.rotate')}
            </Typography>
            <div className="flex-row" style={{ width: '100%' }}>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={100}
                onChange={rotateHandler}
                onClick={rotateHandler}
              />
            </div>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
