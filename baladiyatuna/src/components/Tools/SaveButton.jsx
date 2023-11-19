import React from 'react';
import Button from '@mui/material/Button';

const ReusableButton = ({size, onClick, label }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size={size}
      onClick={onClick}
      style={{
        fontWeight: 'bold',
        paddingInline: '40px'
      }} 
    >
      {label}
    </Button>
  );
};

export default ReusableButton;
