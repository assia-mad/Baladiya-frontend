import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ErrorSnackbar = ({ open, onClose, errorMsg }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {errorMsg}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
