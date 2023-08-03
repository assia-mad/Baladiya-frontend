import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <TranslateIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleLanguageChange('en')}>{t('Anglais')}</MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ar')}>{t('Arabe')}</MenuItem>
        <MenuItem onClick={() => handleLanguageChange('fr')}>{t('Français')}</MenuItem>
      </Menu>
    </>
  );
}
export default LanguageSelector;

