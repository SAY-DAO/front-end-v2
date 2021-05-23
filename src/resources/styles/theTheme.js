import { createTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const theTheme = createTheme({
	palette: {
		primary: {
		// light: will be calculated from palette.primary.main,
			main: "#6a8c30",
			// dark: will be calculated from palette.primary.main,
			dark: "black",
		// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: "#beeeff",
			main: "#5b5a8f",
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
				disableElevation: true,

			},
			styleOverrides: {
				root: {
					borderRadius: 0,
					textTransform: "none",
				},
				containedPrimary: {
					"&:hover": {
						backgroundColor: "black",
					},
				},
				containedSecondary: {
					fontWeight: 700,
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
