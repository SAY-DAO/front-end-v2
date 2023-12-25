import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BuildTheme } from '../../resources/global/Theme-variable';

const ThemeSettings = () => {
  const themeOptions = useSelector((state) => state.themeOptions);
  const theme = BuildTheme({
    direction: themeOptions.activeDir,
    theme: themeOptions.activeTheme,
  });
  useEffect(() => {
    document.dir = themeOptions.activeDir;
  }, [themeOptions]);

  return theme;
};
export default ThemeSettings;
