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
  Button,
  InputAdornment,
  IconButton
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next'; 
import { setEmail } from "../Store/Actions/Actions";
import './ForgetPassword';
import apiInstance from "../../../API";

const ResetPassword = ({ email }) => {
  const [otp, setOtp] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isToastOpen, setToastOpen] = useState(false);
  const [successRequest, setSuccessRequest] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToastClose = () => {
    setToastOpen(false);
    setSuccessRequest(false);
  };

  const { t } = useTranslation(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      otp: otp,
      email: email,
      new_password: password,
      new_password2: confirmPassword
    };
    apiInstance.put(`password-reset-confirm/`, data)
      .then(response => {
        setToastOpen(true);
        console.log("success");
      })
      .catch(error => {
        console.log("erreeeeeeeeeeeeeeeeeur", error.response.data);
        setErrorMsg(error.response.data.detail);
      });
  };

  return (
    <Container className="login-container">
      <CssBaseline />
      <Box className='main-box'>
        {/* when the submit is done successfuly */}
        <Snackbar open={isToastOpen} autoHideDuration={3000} onClose={handleToastClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
            {t('votre mot de passe a été réinitialiser avec succés!')}
          </Alert>
        </Snackbar>
        <Snackbar open={successRequest} autoHideDuration={3000} onClose={handleToastClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
            {t('Le code de réinitialisation est envoyé par email!')} 
          </Alert>
        </Snackbar>
        <Avatar className="login-avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography className='title'>
          {t('Réinitialiser le mot de passe')} 
        </Typography>
        <Typography className="description">{t('réinitialiser votre mot de passe en utilisant le code que vous avez reçu')}</Typography> 
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }} >
          <Grid container spacing={2} fullWidth>
            <Grid item xs={12} >
              <TextField
                type="tel"
                label={t('Entrer le code de 4 chiffres')}
                variant="outlined"
                fullWidth
                onChange={(e) => setOtp(e.target.value)}
                inputProps={{
                  pattern: '[0-9]*',
                  inputMode: 'numeric',
                  maxLength: 4,
                }}
                className="back-ground-gray"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label={t('Nouveau mot de passe')} 
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                className="back-ground-gray"
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
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label={t('Confirmer le nouveau mot de passe')} 
                type="password"
                id="passwordConfirm"
                autoComplete="new-password"
                autoFocus
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          {errorMsg && (
            <Typography variant="body1" color="error" style={{ marginTop: '1rem' }}>
              {errorMsg}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  email: state.email,
});

export default connect(mapStateToProps)(ResetPassword);
