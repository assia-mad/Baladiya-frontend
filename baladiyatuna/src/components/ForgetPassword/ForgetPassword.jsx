import React from "react";
import {
  Typography,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  TextField,
  Snackbar,
  Alert,
  Button
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import { setEmail } from "../Store/Actions/Actions";
import apiInstance from "../../../API";
import './ForgetPassword.css';

const ForgetPassword = ({ email, setEmail }) => {
  const [isToastOpen, setToastOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { t } = useTranslation(); // Get the t function from useTranslation
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    apiInstance.post(`password-reset/`, data)
      .then(response => {
        console.log('success');
        navigate('/reset_password');
      })
      .catch(error => {
        setToastOpen(true);
        setErrorMsg(error);
        console.log("erreeeeeeeeeeeeeeeeeur", error);
      });
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <Container className="login-container">
      <CssBaseline />
      <Box className='main-box'>
        {/* when there is an error */}
        <Snackbar open={isToastOpen} autoHideDuration={3000} onClose={handleToastClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
            {t("un utilisateur avec cet email n'existe pas !")} 
          </Alert>
        </Snackbar>
        <Avatar className="login-avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography className='title'>
          {t('Mot de Passe oublié')} 
        </Typography>
        <Typography className="description">{t('Veuillez entrer votre addresse mail pour réinitialiser votre mot de passe')}</Typography> {/* Apply translation here */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }} >
          <Grid container spacing={2} fullWidth>
            <Grid item xs={12} >
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="email"
                label={t('email')}
                type="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                className="back-ground-gray"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}>{t('Réinitialiser le mot de passe')} 
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  email: state.email,
});

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
