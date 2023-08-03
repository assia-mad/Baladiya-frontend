import {
    Typography,
    Box,
    Container,
    CssBaseline,
    Avatar,
    Grid,
    TextField,
    Link,
    Button,
    IconButton,
    InputAdornment,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import FacebookIcon from '@mui/icons-material/Facebook';
  import InstagramIcon from '@mui/icons-material/Instagram';
  import TwitterIcon from '@mui/icons-material/Twitter';
  import Visibility from "@mui/icons-material/Visibility";
  import VisibilityOff from "@mui/icons-material/VisibilityOff";
  import { useState, useEffect } from "react";
  import { useNavigate } from 'react-router-dom';
  import { useTranslation } from 'react-i18next'; 
  import "./Login.css";
  import { setToken } from "../../config";
  import apiInstance from "../../../API";
  
  const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isToastOpen, setToastOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation(); 
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleToastClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setToastOpen(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
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
  
        // Retrieve user data with social_approved field
        apiInstance.get(`user/`).then(response => {
          console.log(response);
          navigate('/home');
          if (data.role === "Admin") {
            //navigate to admin pannel
  
          } else {
  
            //navigate to baladiya agent home
  
          }
        }).catch(error => {
          console.log("error to get user data", error);
        });
      }).catch(error => {
        setToastOpen(true);
        console.log("erreeeeeeeeeeeeeeeeeur to login", error);
        setErrorMsg(t('Erreur: requete echouée'));
      });
    };
  
    return (
      <Container className="login-container">
        <CssBaseline />
        <Box className='main-box'>
          <Snackbar open={isToastOpen} autoHideDuration={3000} onClose={handleToastClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
              {errorMsg}
            </Alert>
          </Snackbar>
          <Avatar className="login-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography className='title'>
            {t('Connectez vous maitenant')}
          </Typography>
          <Typography className="description">{t('Veuillez vous connectez pour continuer à utiliser notre application')}</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
            <Grid container spacing={2} fullWidth>
              <Grid item xs={12} >
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label={t("email")}
                  type="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  className="back-ground-gray"
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
                  label={t("password")}
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/forget_password" variant="body2">
                    {t("Mot de passe oublié?")} 
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}>{t("S'identifier")} 
              </Button>
              <Grid container className="same-line-center">
                <Typography variant="body1">{t("Vous n'avez pas de compte")} 
                  <Link href="/" >{t("S'inscrire")}</Link> 
                </Typography>
  
              </Grid>
              <Grid container className="social-login">
                <Grid item>
                  <IconButton>
                    <FacebookIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <InstagramIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <TwitterIcon />
                  </IconButton>
                </Grid>
              </Grid>
  
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
  
  export default Login;
  