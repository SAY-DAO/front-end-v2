const components = {
  MuiContainer: {
    defaultProps: {
      // disableGutters: true, // If true, the left and right padding is removed.
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
      outlinedSecondary: {
        minWidth: '140px',
        borderRadius: '10px',
        // background: 'linear-gradient(5deg, white 100%, #F59E39 100%)',
        color: ' #F05A31 ',
        borderColor: ' #F05A31 ',
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
        backgroundColor: '#737b74',
        color: 'white',
        fontWeight: 10,
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
        // backgroundColor: '#ffee58',
        // color: "black"
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        '&.Mui-selected ': {
          color: '#fbb563',
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: '#ffdfc1 !important',
        color: '#ffdfc1 !important',
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
        // backgroundColor: 'white',
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        // backgroundColor: 'white',
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
};

export default components;
