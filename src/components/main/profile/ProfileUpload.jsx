/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// For multi-language
import AvatarEditor from 'react-avatar-editor';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import { Redirect, useHistory } from 'react-router';
import OutlinedInput from '@material-ui/core/OutlinedInput';
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
export default function UserProfileEdit() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [editor, setEditor] = useState(null);
  const [done, setDone] = useState(false);
  const [file, setFile] = useState(location.state.imageUpload);
  const [tumb, setTumb] = useState(null);

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

  const onClickSave = () => {
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

      setPhoto(theFile);
      setTumb(canvas);
      setDone(true);
      history.push('/main/profile/edit', { newImage: theFile });
    }
  };

  const setEditorRef = (thisEditor) => setEditor(thisEditor);

  return (
    <Grid container>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Link
          to={{
            pathname: '/main/profile/edit',
            state: { newPhoto: null, tumbnail: null },
          }}
        >
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
        </Link>

        <Typography
          variant="h6"
          sx={{
            padding: 2,
            fontWeight: 'lighter',
            textAlign: 'center',
          }}
        >
          {t('profile.editProfile.avatar.title')}
        </Typography>

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
          <IconButton onClick={onClickSave}>
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
          </IconButton>
        )}
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

          <Grid container sx={{ margin: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ margin: 'auto', marginLeft: 1, marginRight: 1 }}
            >
              {t('profile.editProfile.avatar.scale')}
            </Typography>
            <div className="flex-row" style={{ width: '70%' }}>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={0}
                onChange={scaleHandler}
                onClick={scaleHandler}
              />
            </div>
          </Grid>

          <Grid container sx={{ margin: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ margin: 'auto', marginLeft: 1, marginRight: 1 }}
            >
              {t('profile.editProfile.avatar.rotate')}
            </Typography>
            <div className="flex-row" style={{ width: '70%' }}>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={0}
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
