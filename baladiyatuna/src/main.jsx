import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './components/Store/Reducers/Reducer.jsx';
import Theme from '../theme.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <App />
      </ThemeProvider>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
)
