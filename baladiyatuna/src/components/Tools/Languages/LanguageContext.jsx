import React from 'react';

const LanguageContext = React.createContext({
  language: 'en',
  direction: 'ltr',
  changeLanguage: () => {}
});

export default LanguageContext;
