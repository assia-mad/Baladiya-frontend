import React, { useState, useCallback } from 'react';
import LanguageContext from './LanguageContext';

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('');
  const [direction, setDirection] = useState('ltr');

  const changeLanguage = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    setDirection(newLanguage === 'ar' ? 'ltr' : 'ltr');
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
