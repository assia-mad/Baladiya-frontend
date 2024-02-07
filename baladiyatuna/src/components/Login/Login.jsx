import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Button,
  Grid,
  Link,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../../API'; 
import { setToken } from "../../config";
import ErrorSnackbar from '../Tools/ErrorSnackBar';
import PrimaryColorText from '../Tools/Title';

// Custom styling
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', 
  alignItems: 'center',
  justifyContent: 'center', 
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '1rem',
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(''); 
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const navigate = useNavigate();
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password
    };
    apiInstance.post(`login/`, loginData).then(response => {
      console.log("success");
      const token = response.key;
      console.log('token is', token);
      setToken(token);
      setLoggedIn(true);
      console.log(token);

      apiInstance.get(`user/`).then(response => {
        console.log(response);
        
        if (response.role === "Admin") {
          navigate('/admin-home');

        } else if(response.role === "Agent")  {

          navigate('/home');

        }
        else {
          const role = response.role;
          setError(t('vous ne pouvez pas connecter'),role);
          setOpenErrorSnackbar(true);
        }
    

      }).catch(error => {
        console.log("error to get user data", error);
        const errorMessage = error.response.data.detail || t('Une erreur s\'est produite lors de la récupération des données utilisateur');
        setError(errorMessage); 
        setOpenErrorSnackbar(true);
      });
    }).catch(error => {
      console.log("erreeeeeeeeeeeeeeeeeur to login", error);
      console.error("error to login", error);
      if (error.response) {
        if (error.response.data.email) {
          setEmailError(error.response.data.email.join(' '));
        }
        else if (error.response.data.password) {
          setPasswordError(error.response.data.password.join(' '));
        }
        else if (error.response.data.non_field_errors[0]){
          const errorMessage = error.response.data.non_field_errors[0] || t('Une erreur s\'est produite lors de la connexion.');
          setError(errorMessage);
          setOpenErrorSnackbar(true); 
        }
      else {
        setError('Une erreur s\'est produite lors de la connexion');
        setOpenErrorSnackbar(true);
      }


 
      }
    });
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorSnackbar(false);
  };


  return (
    <StyledContainer component="main">
      <CssBaseline />
      <StyledPaper elevation={6}>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <PrimaryColorText className="title" variant="h5">
          {t('Connectez-vous maintenant!')} 
        </PrimaryColorText>
        <StyledForm noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('Email')} 
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('Mot de passe')} 
            type={showPassword ? 'text' : 'password'}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t('toggle password visibility')}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {t('S\'identifier')} 
          </StyledButton>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link href="/forget_password" variant="body2">
                {t('Mot de passe oublié?')}
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2">
                {t('Vous n\'avez pas de compte? S\'inscrire')}
              </Link>
            </Grid> */}
          </Grid>
        </StyledForm>
      </StyledPaper>
      <ErrorSnackbar
        open={openErrorSnackbar}
        onClose={handleCloseErrorSnackbar}
        errorMsg={error}
      />
    </StyledContainer>
  );
};

export default Login;
