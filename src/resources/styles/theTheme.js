import { createTheme } from '@material-ui/core/styles';

const theTheme = createTheme({
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
      // light: will be calculated from palette.primary.main,
      main: '#fbb563',
      // dark: will be calculated from palette.primary.main,
      dark: 'black',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#bfeeff',
      main: '#6be2fe',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color"s luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    // tonalOffset: 0.2,
  },
  typography: {
    fontFamily: '"iranyekan", "roboto"',
  },
  components: {
    MuiContainer: {
      defaultProps: {
        // disableGutters: true, // If true, the left and right padding is removed.
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle1: {
          color: '#636363',
          fontWeight: 500,
          fontSize: '13px',
          lineHeight: '14px',
        },
        subtitle2: {
          color: '#636363',
          fontWeight: 300,
          fontSize: '12px',
          lineHeight: '14px',
        },
        body1: {
          color: '#000000',
          fontWeight: 200,
          fontSize: '12px',
          lineHeight: '14px',
        },
        body2: {
          fontSize: '11px',
          lineHeight: '18px',
        },
        span: {
          color: '#636363',
          fontSize: '10px',
          lineHeight: '18px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        // disableRipple: true, // No more ripple!
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        containedPrimary: {
          minWidth: '240px',
          minHeight: '40px',
          background: 'linear-gradient(90deg, #F59E39 100%, #F05A31 100%)',
          borderRadius: '48px',
          color: 'white',
        },
        outlinedPrimary: {
          minWidth: '240px',
          borderRadius: '48px',
        },
        filledPrimary: {
          color: 'white',
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: '#6a8c30',
          color: 'blue',
        },
        arrow: {
          color: 'green',
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        // shrink: true,
      },
      styleOverrides: {
        root: {
          // textTransform: "uppercase",
          fontSize: '0.7rem',
          '&.Mui-focused': {
            color: '#1e1e1e',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '40px',
          borderRadius: 4,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // textTransform: 'uppercase',
          fontSize: '0.5rem',
          '&.Mui-focused': {
            fontSize: '0.6rem',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          minWidth: '250px',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#fbb563',
          display: 'block',
          margin: 'auto',
          marginTop: 10,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          marginTop: 6,
          fontSize: '0.75rem',
        },
        message: {
          padding: '10px',
        },
        outlinedError: {
          color: '#f44336',
          borderColor: 'transparent',
        },
        outlinedSuccess: {
          color: '#20c997',
          borderColor: 'transparent',
        },
        filledWarning: {
          backgroundColor: '#ffee58',
          // color: "black"
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    // e.g from browser:  MuiAvatar-root MuiAvatar-circular MuiAvatarGroup-avatar muirtl-a95z4p-MuiAvatar-root
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          '.MuiAvatarGroup-avatar': {
            width: 20,
            height: 20,
            fontSize: '0.8rem',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#8c8c8c',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    // e.g from browser: MuiStepLabel-label Mui-completed MuiStepLabel-alternativeLabel muirtl-3csdud-MuiStepLabel-label
    MuiStepLabel: {
      styleOverrides: {
        label: {
          '&.MuiStepLabel-alternativeLabel': {
            marginTop: 0,
          },
        },
      },
    },
  },
});

export default theTheme;
