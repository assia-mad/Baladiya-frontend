import React from 'react';
import Switch from '@mui/material/Switch';

const CustomSwitch = ({ checked, onChange }) => {
  return <Switch checked={checked} onChange={onChange} />;
};

export default CustomSwitch;
