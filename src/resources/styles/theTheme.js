import { createTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const theTheme = createTheme({
	direction: "rtl",
	palette: {
		primary: {
		// light: will be calculated from palette.primary.main,
			main: "#f16531",
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
		tonalOffset: 0.2,
	},
	components: {
		MuiContainer: {
			defaultProps:{
				// disableGutters: true, // If true, the left and right padding is removed.
			}
		},
		MuiButtonBase: {
			defaultProps: {
				// disableRipple: true, // No more ripple!
			},
			styleOverrides: {
				root: {
					textTransform: "none",
				},
				containedPrimary: {
					background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
					color: "red",
					"&:hover": {
						backgroundColor: "blue",
					},
				},
				containedSecondary: {
					// background: "linear-gradient(90deg, #F59E39 0%, #F05A31 100%)",
					background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
					fontWeight: 7000,
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
				shrink: true,
			},
			styleOverrides: {
				root: {
					textTransform: "uppercase",
					fontSize: "1.5rem",
				},
			},
		},MuiInput: {
			defaultProps: {
				disableUnderline: true,
			},
			styleOverrides: {
				root: {
					border: `1px solid ${grey[500]}`,
					outline: "1px solid transparent",
					padding: 2,
					"&$focused": {
						border: "1px solid red",
						outline: "1px solid blue",
					},
				},
			},
		},
	}
});

export default theTheme;
