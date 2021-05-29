import { createTheme } from "@material-ui/core/styles";

const theTheme = createTheme({
	direction: "rtl",
	fontFamily: "iranyekan",

	palette: {
		background: {
			default: "#FFF" // CSSBaseline is needed for this
		},
		primary: {
		// light: will be calculated from palette.primary.main,
			main: "#F05A31",
			// dark: will be calculated from palette.primary.main,
			dark: "black",
		// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: "#bfeeff",
			main: "#6be2fe",
			// dark: will be calculated from palette.secondary.main,
			contrastText: "#ffcc00",
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		// tonalOffset: 0.2,
	},
	typography: {
		fontFamily: "\"iranyekan\", \"roboto\""
	},  
	components: {
		MuiContainer: {
			defaultProps:{
				// disableGutters: true, // If true, the left and right padding is removed.
			}
		},
		MuiTypography: {
			styleOverrides:{
				subtitle1:{
					color:"#666666",
					fontWeight: 500,
					fontSize: "12px",
					lineHeight: "14px",
				},
				body1:{
					color:"#8C8C8C",
					fontWeight: 200,
					fontSize: "10px",
					lineHeight: "14px",
				}
			}
		},
		MuiButton: {
			defaultProps: {
				// disableRipple: true, // No more ripple!
			},
			styleOverrides: {
				root: {
					textTransform: "none",
				},
				containedPrimary: {
					minWidth: "240px",
					background: "linear-gradient(90deg, #F59E39 0%, #F05A31 100%)",
					borderRadius: "48px",
				},
				outlinedPrimary: {
					minWidth: "240px",
					borderRadius: "48px",
				},
			},
		},
		MuiTooltip: {
			defaultProps: {
				arrow: true,
			},
			styleOverrides: {
				tooltip: {
					backgroundColor: "#6a8c30",
					border: "2px solid red",
					color: "bllue",
				},
				arrow: {
					color: "green",
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
					fontSize: "0.7rem",
				},
			},
		},
		MuiOutlinedInput: {
			defaultProps: {

			},
			styleOverrides: {
				root: {
					height: "40px",
					"&$focused": {
						border: "1px solid red",
						outline: "1px solid blue",
					},
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					padding: 2,
					height: "35px",
					"&$focused": {
						border: "1px solid red",
						outline: "1px solid blue",
						
					},
				},
			},
		},
		MuiCircularProgress: {
			styleOverrides: {
				root: {
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					"& > * + *": {
						marginLeft: 2,
					},
					width: "100%",
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					margin: 4
				},
				filledError: {
					backgroundColor: "#ff4569",
				},
				filledSuccess: {
					backgroundColor: "#00e676",
					color: "black"
				},
				filledWarning: {
					backgroundColor: "#ffee58",
					color: "black"
				}
			},
		},
	}
});

export default theTheme;
