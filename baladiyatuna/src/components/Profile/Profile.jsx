import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  MenuItem,
  IconButton,
  ListItemText, 
  Select,
  Link
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useTranslation } from 'react-i18next';
import './Profile.css';
import apiInstance from "../../../API";

const Profile = () => {
  const { t } = useTranslation();
  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [imageChanged, setImageChanged] = useState(false);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    wilaya: null,
    commune: null,
    image: '',
    email: '',
  });
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [imageError, setImageError] = useState('');
  const [nonFieldError, setNonFieldError] = useState('');
  const [error, setError] = useState('');  


  const fetchWilayas = async () => {
    try {
      const response = await apiInstance.get(`wilayas/`);
      setWilayas(response?.results);
      console.log(response?.results);
    } catch (error) {
      console.log(error.response);
      setError(error.message); 
    }
  };

  const fetchCommunes = async (wilaya) => {
    try {
      const response = await apiInstance.get(
      `communes/?wilaya=${wilaya}`
      );
      setCommunes(response?.results);
      console.log(response?.results);
    } catch (error) {
      console.log(error);
      setError(error.message); 
    }
  };

  const fetchUser = async () => {
    try {
      const response = await apiInstance.get(`user/`);
      console.log('fetching the user', response);
      const idCommune = response?.commune;
      const idWilaya = response?.wilaya;
      const reponseWilaya = await apiInstance.get(`wilayas/${idWilaya}/`);
      setSelectedWilaya(reponseWilaya?.name);
      const reponseCommune = await apiInstance.get( `communes/${idCommune}/`);
      console.log("lescommune selonid",reponseCommune?.name);
      setSelectedCommune(reponseCommune?.name);
      console.log("the first commune",selectedCommune);
      setUser(response);
    } catch (error) {
      console.log(error);
      setError(error.message); 
    }
  };

  useEffect(() => {
    fetchUser();
    fetchWilayas();
  }, []);

  useEffect(() => {
    if (user.wilaya) {
      fetchCommunes(user.wilaya);
    }
  }, [user.wilaya]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('wilaya', user.wilaya);
    formData.append("commune",user.commune);
    if (imageChanged) {
      formData.append('image', user.image); 
    }

    try {
      await apiInstance.patch(`user/`, formData);
      fetchUser();
    } catch (error) {
      console.log(error.response.data);
      if (error.response) {
        const { data } = error;
        setLastNameError(data.last_name);
        setFirstNameError(data.first_name);
        setEmailError(data.email);
        setPhoneError(data.tel);
        setImageError(data.image);
      } 
      else if(data.non_field_errors) {
        setNonFieldError(data.non_field_errors[0]);
      }
      else {
        setError(t('Une erreur est apparu. svp réessayer!'));
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'wilaya') {
      setSelectedWilaya(value);
      const selectedWil = wilayas.find((wilaya) => wilaya.name === value);
      setUser((prevUser) => ({
        ...prevUser,
        wilaya: selectedWil.id,
      }));
      fetchCommunes(selectedWil.id);
    } else if (name === 'commune') {
      setSelectedCommune(value);
      const selectedCom = communes.find((commune) => commune.name === value);
      setUser((prevUser) => ({
        ...prevUser,
        commune: selectedCom.id,
      }));
      console.log("selected commune",selectedCom);
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const uploadedPhoto = e.target.files[0];
    setImageChanged(true);
    setUser((prevUser) => ({
      ...prevUser,
      image: uploadedPhoto,
    }));
  };

  return (
    <Box className='main-container'>
      <Grid container direction='column' alignItems='center' spacing={2}>
        <Grid item>
          <Typography className='title' variant='h4'>
            {t('Profile')}
          </Typography>
        </Grid>
        <Grid item mt={2}>
          <Card>
            <Box display='flex' justifyContent='center' mt={2}>
              <CardMedia>
                <Avatar
                  alt='Profile Photo'
                  src={user.image}
                  sx={{ width: 100, height: 100 }}
                />
                <label htmlFor='photo-upload'>
                  <input
                    type='file'
                    id='photo-upload'
                    name='image_url'
                    accept='image/*'
                    style={{ display: 'none' }}
                    onChange={(e) => handlePhotoChange(e)}
                  />
                  <IconButton color='primary' component='span'>
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </CardMedia>
            </Box>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('Prénom')}
                      name='first_name'
                      value={user.first_name}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      error={!!firstNameError}
                      helperText={firstNameError}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('Nom')}
                      name='last_name'
                      value={user.last_name}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      error={!!lastNameError} 
                      helperText={lastNameError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={t('Phone')}
                      name='phone'
                      value={user.phone}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      error={!!phoneError} 
                      helperText={phoneError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={t('Email')}
                      name='email'
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      error={!!emailError}
                      helperText={emailError}
                    />
                  </Grid>
                    <Grid item xs={12} sm={6}>
                    <Select
                      label={t('Wilaya')}
                      name='wilaya'
                      value={selectedWilaya}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                    >
                      {wilayas.map((wilaya) => (
                        <MenuItem key={wilaya.id} value={wilaya.name}>
                          {wilaya.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                      label={t('Commune')}
                      name='commune'
                      value={selectedCommune}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                    >
                      {communes.map((commune) => (
                        <MenuItem key={commune.id} value={commune.name}>
                          {commune.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                <Box display='flex' justifyContent='center' mt={2}>
                  <Button variant='contained' color='primary' type='submit'>
                  {t('Edit Profile')}
                  </Button>
                </Box>
                <Grid container justifyContent="center" mt="3%">
              <Grid item>
                <Link href="/Login" variant="body2">
                {t('Changer le mot de passe')}
                </Link>
              </Grid>
            </Grid>
              </form>
            </CardContent>
          </Card>
          {error && (
          <Typography variant="body1" color="error">
            {t(error)}
        </Typography>
      )}


        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
