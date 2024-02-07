import * as React from 'react';
import {
  Typography ,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  TextField,
  Link,
  Button,
  IconButton,
  InputAdornment
}from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorSnackbar from '../Tools/ErrorSnackBar';
import { useState } from 'react';
import './SignUp.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:5173/">
        Baladitaty
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const SignUp = () => {

    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPasswor, setConfirmPassword] = useState(null);
    const [wilaya, setWilaya] = useState(null);
    const [commune, setCommune] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [socialNumber, setSocialNumber] = useState(null);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };

    const handleSubmit = (event) => {
      const endpoint = "http://46.101.114.129/nera/register/"
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email
    });
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json",'Accept': 'application/json' },
      body: JSON.stringify({ email: data.get('email') , password1: data.get('password') ,password2: data.get('password'),
        first_name:data.get('firstName'),last_name :data.get('lastName'),address:"terny", tel:"0123456789",age:20,gender:'féminin'}), 
      })
      .then((response)=>{
          if (response.ok){
              console.log("succes");
          }
          else{
              console.log("erreur");
          }
          return response.json();
      })

  };

  return (
      <Container className='sign-up-container'>
        <CssBaseline />
        <Box className='main-box'>
          <Avatar className="sign-up-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography className='title'>
            S'inscrire maitenant
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  onChange={ (e)=>setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={ (e)=>setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={ (e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type= {showPassword ? "text":"password"}
                  id="password"
                  autoComplete="new-password"
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
                  label="Confirmer le mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="wilaya"
                  name="wilaya"
                  required
                  fullWidth
                  id="wilaya"
                  label="Wilaya"
                  autoFocus
                  onChange={ (e)=>setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="commune"
                  label="Commune"
                  name="commune"
                  autoComplete="family-name"
                  onChange={ (e)=>setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="social-number"
                  label="numéro social"
                  name="social-number"
                  autoComplete="social-number"
                  onChange={ (e)=>setSocialNumber(e.target.value)}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  vous avez déja un compte? S'identifier
                </Link>
              </Grid>
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}

export default SignUp ;