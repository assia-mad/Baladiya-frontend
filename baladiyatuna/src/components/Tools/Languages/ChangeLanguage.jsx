import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import LanguageContext from './LanguageContext';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useContext(LanguageContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    i18n.changeLanguage(language);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="Change Language" color="primary">
        <LanguageIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleLanguageChange('en')}>{t('Anglais')}</MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ar')}>{t('Arabe')}</MenuItem>
        <MenuItem onClick={() => handleLanguageChange('fr')}>{t('Français')}</MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelector;
