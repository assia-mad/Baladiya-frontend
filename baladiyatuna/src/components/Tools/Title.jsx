import React from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PrimaryColorText = ({ children,style, ...restProps }) => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;


  return (
    <Typography style={{ color: primaryColor, ...style }} {...restProps}>
      {children}
    </Typography>
  );
};

export default PrimaryColorText;
