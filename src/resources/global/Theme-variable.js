import _ from 'lodash';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import components from './Override';

import { BLUE_THEME, ORANGE_THEME } from '../../redux/constants/themeConstants';

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
  // direction: 'rtl',
  fontFamily: 'iranyekan',
  palette: {
    background: {
      default: '#f7f7f7', // CSSBaseline is needed for this
    },
    primary: {
      main: '#fbb563',
      dark: 'black',
    },
    secondary: {
      light: '#bfeeff',
      main: '#6be2fe',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
  },
  typography: {
    fontFamily: '"iranyekan", "roboto"',
  },
  components,
};

const themesOptions = [
  {
    name: BLUE_THEME,
    palette: {
      // primary: {
      //   main: '#1a97f5',
      //   light: '#e6f4ff',
      //   dark: '#1682d4',
      // },
      // secondary: {
      //   main: '#1e4db7',
      //   light: '#ddebff',
      //   dark: '#173f98',
      // },
    },
  },

  {
    name: ORANGE_THEME,
    palette: {
      // primary: {
      //   main: '#03c9d7',
      //   light: '#e5fafb',
      //   dark: '#05b2bd',
      //   contrastText: '#ffffff',
      // },
      // secondary: {
      //   main: '#fb9678',
      //   light: '#fcf1ed',
      //   dark: '#e67e5f',
      //   contrastText: '#ffffff',
      // },
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
        // default: activeMode === 'dark' ? '#20232a' : '#fafbfb',
        // dark: activeMode === 'dark' ? '#1c2025' : '#ffffff',
        // paper: activeMode === 'dark' ? '#282C34' : '#ffffff',
      },
      text: {
        // primary: activeMode === 'dark' ? '#e6e5e8' : 'rgba(0, 0, 0, 0.87)',
        // secondary: activeMode === 'dark' ? '#adb0bb' : '#777e89',
      },
    },
  };
  if (!myThemes) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [myThemes] = myThemes;
  }

  const theme = createTheme(
    _.merge({}, baseTheme, baseMode, themeOptions, {
      direction: config.direction,
    })
  );
  return theme;
};

export { baseTheme };
