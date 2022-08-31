import { THEME_COLOR, DARK_THEME } from '../constants/themeConstants';

const INIT_STATE = {
  activeMode: 'light', // light or dark
  activeTheme: 'ORANGE_THEME',
};

const themeReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case DARK_THEME:
      return {
        ...state,
        activeMode: action.payload,
      };
    case THEME_COLOR:
      return {
        ...state,
        activeTheme: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
