import _ from 'lodash';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import components from './Override';
import typography from './Typography';

import {
  BLUE_THEME,
  ORIGINAL_THEME,
} from '../../redux/constants/themeConstants';

const baseTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 900,
      xl: 1200,
    },
  },
  palette: {
    primary: {
      main: '#fbb563',
      light: '#e6f4ff',
      dark: '#1682d4',
    },
    secondary: {
      light: '#bfeeff',
      main: '#6be2fe',
      dark: '#173f98',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
  },
  typography,
  components,
};

const themesOptions = [
  {
    name: BLUE_THEME,
    palette: {
      primary: {
        main: '#1a97f5',
        light: '#e6f4ff',
        dark: '#1682d4',
      },
      secondary: {
        main: '#1e4db7',
        light: '#ddebff',
        dark: '#173f98',
      },
    },
  },

  {
    name: ORIGINAL_THEME,
    palette: {
      primary: {
        main: '#fbb563',
        light: '#e6f4ff',
        dark: '#1682d4',
      },
      secondary: {
        light: '#bfeeff',
        main: '#6be2fe',
        dark: '#173f98',
        contrastText: '#ffcc00',
      },
    },
  },
];

export const BuildTheme = (config = {}) => {
  let myThemes = themesOptions.find((t) => t.name === config.theme);
  const themeOptions = useSelector((state) => state.themeOptions);
  const { activeMode } = themeOptions;

  const baseMode = {
    palette: {
      mode: activeMode,
      background: {
        default: activeMode === 'dark' ? '#20232a' : '#f7f7f7',
        dark: activeMode === 'dark' ? '#1c2025' : '#ffffff',
        paper: activeMode === 'dark' ? '#282C34' : '#ffffff',
      },
      text: {
        primary: activeMode === 'dark' ? 'white' : '#636363',
        secondary: activeMode === 'dark' ? '#adb0bb' : '#777e89',
        custom: 'red',
      },
    },
  };
  if (!myThemes) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [myThemes] = myThemes;
  }

  const theme = createTheme(_.merge({}, baseTheme, baseMode, themeOptions, {}));
  return theme;
};

export { baseTheme };
