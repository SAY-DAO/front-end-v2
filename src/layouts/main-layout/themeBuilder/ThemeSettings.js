import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BuildTheme } from '../../../resources/global/Theme-variable';

const ThemeSettings = () => {
  const themeOptions = useSelector((state) => state.themeOptions);
  const { activeTheme } = themeOptions;

  const theme = BuildTheme({
    theme: activeTheme,
  });

  return theme;
};
export default ThemeSettings;
