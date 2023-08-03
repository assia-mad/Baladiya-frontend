import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, IconButton, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StateMenuSelect = ({ currentState, onChangeState }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSwitchChange = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeState = (newState) => {
    onChangeState(newState);
    setAnchorEl(null);
  };

  return (
    <>
      <Typography variant="body1" mt={2}>{t(currentState)}</Typography>
      <IconButton onClick={handleSwitchChange}>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleChangeState(t('en traitement'))}>{t('En traitement')}</MenuItem>
        <MenuItem onClick={() => handleChangeState(t('validé'))}>{t('Validé')}</MenuItem>
        <MenuItem onClick={() => handleChangeState(t('refusé'))}>{t('Refusé')}</MenuItem>
      </Menu>
    </>
  );
};

export default StateMenuSelect;
