import { THEME_COLOR, DARK_THEME } from '../constants/themeConstants';

export const setTheme = (payload) => ({
  type: THEME_COLOR,
  payload,
});
export const setDarkMode = (payload) => ({
  type: DARK_THEME,
  payload,
});
