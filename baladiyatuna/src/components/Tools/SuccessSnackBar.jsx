import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SuccessSnackbar = ({ open, onClose, successMsg }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        {successMsg}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
