import { THEME_COLOR, DARK_OR_LIGHT } from '../constants/themeConstants';

export const setTheme = (payload) => ({
  type: THEME_COLOR,
  payload,
});
export const setActiveMode = (payload) => ({
  type: DARK_OR_LIGHT,
  payload,
});
