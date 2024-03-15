import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LanguageProvider from './components/Tools/Languages/LanguageProvider';
import LanguageContext from './components/Tools/Languages/LanguageContext';
import { UserProvider } from './components/Tools/fetchCurrentUser';
import Routers from './Routes';
import Theme from '../theme';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

const AppContent = () => {
  const { direction } = useContext(LanguageContext);
  const themeWithDirection = {
    ...Theme,
    direction: direction,
  };

  return (
    <ThemeProvider theme={themeWithDirection}>
      <UserProvider>
      <div dir={direction}>
        <Routers />
      </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
