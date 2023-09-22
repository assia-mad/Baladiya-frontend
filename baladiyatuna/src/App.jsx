import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routers from './Routes';

const theme = createTheme();

function App() {
  return (
    <Router>
      <div>
        <Routers /> 
      </div>
    </Router>
  );
}

export default App;
