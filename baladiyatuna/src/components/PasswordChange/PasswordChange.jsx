import React, { useState } from "react";
import { Typography, Box, Container, CssBaseline, Avatar, Grid, TextField, Snackbar, Alert, Button, IconButton, InputAdornment } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from 'react-i18next'; 
import './PasswordChange.css';
import apiInstance from "../../../API";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isErrorToastOpen, setErrorToastOpen] = useState(false);
  const [isSuccessToastOpen, setSuccessToastOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nonFieldError, setNonFieldError] = useState("");
  let navigate = useNavigate();
  const { t } = useTranslation(); 
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOldPasswordError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNonFieldError("");

    const data = {
      old_password: oldPassword,
      new_password1: password,
      new_password2: confirmPassword
    };

    apiInstance.post(`password-change/`, data)
      .then(response => {
        console.log('success');
        setSuccessToastOpen(true);
      })
      .catch(error => {
        setErrorToastOpen(true);
        setErrorMsg(error);
        console.log("error", error.response.data);

        if (error.response) {
          const { data } = error.response;

          if (data.old_password) {
            setOldPasswordError(data.old_password);
          }

          if (data.new_password1) {
            setPasswordError(data.new_password1);
          }

          if (data.new_password2) {
            setConfirmPasswordError(data.new_password2);
          }
        } else if (data.non_field_errors) {
          setNonFieldError(data.non_field_errors[0]);
        } else {
          setError('Une erreur est apparue. Veuillez réessayer !');
        }
      });
  };

  const handleToastClose = () => {
    setErrorToastOpen(false);
    setSuccessToastOpen(false);
  };

  return (
    <Container className="login-container">
      <CssBaseline />
      <Box className='main-box'>
        <Snackbar
          open={isErrorToastOpen}
          autoHideDuration={3000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
            {errorMsg && errorMsg.message}
          </Alert>
        </Snackbar>
        <Snackbar open={isSuccessToastOpen} autoHideDuration={3000} onClose={handleToastClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
            {t('votre mot de passe a été changer correctement!')}
          </Alert>
        </Snackbar>
        <Avatar className="login-avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography className='title'>
          {t('Changer le mot de passe')}
        </Typography>
        <Typography className="description">{t('Veuillez entrer votre nouveau mot de passe')}</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }} >
          <Grid container spacing={2} fullWidth>
            <Grid item xs={12} >
              <TextField
                autoComplete="old-password"
                name="oldPassword"
                required
                fullWidth
                id="oldPassword"
                type={showPassword ? "text" : "password"}
                label={t('Ancien mot de passe')}
                onChange={(e) => setOldPassword(e.target.value)}
                className="back-ground-gray"
                error={!!oldPasswordError}
                helperText={oldPasswordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="password"
                name="password"
                required
                fullWidth
                id="password"
                type={showPassword ? "text" : "password"}
                label={t('Mot de passe')}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                className="back-ground-gray"
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label={t('Confirmer le mot de passe')}
                type="password2"
                id="password2"
                autoComplete="new-password"
                className="back-ground-gray"
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}>{t('Réinitialiser le mot de passe')}</Button>

          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default ChangePassword;
