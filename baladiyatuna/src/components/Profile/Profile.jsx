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
  Link,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useTranslation } from 'react-i18next';
import { InputLabel } from '@mui/material';
import './Profile.css';
import apiInstance from '../../../API';
import Communes from '../Tools/Communes';
import Wilayas from '../Tools/Wilayas';
import algeriaCities from '../../../dzData.json';
import SuccessSnackbar from '../Tools/SuccessSnackBar';

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};

const Profile = () => {
  const { t } = useTranslation();
  const [successMsg, setSuccessMsg] = useState('');
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState('');
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

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  const fetchUser = async () => {
    try {
      const response = await apiInstance.get(`user/`);
      const communeID = response.commune; 
      setCommuneCode(communeID);
      const wilayaCode = getWilayaCodeByCommuneId(communeID);
      const communeName = getCommuneNameById(communeID);
      setSelectedCommune(communeName);
      setWilayaCode(wilayaCode);
      setUser(response);

    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('wilaya', user.wilaya);
    formData.append('commune', communeCode);
    if (imageFile) {
      formData.append("image", imageFile);
      console.log('theeeee sended file',imageFile);
    }

    try {
      await apiInstance.patch(`user/`, formData);
      fetchUser();
      setSuccessOpen(true);
      setSuccessMsg(t('La modification a réussi!'));
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        const { data } = error.response;
        setLastNameError(data.last_name);
        setFirstNameError(data.first_name);
        setEmailError(data.email);
        setPhoneError(data.phone); 
        setImageError(data.image); 
      } else {
        setError(t('Une erreur est apparue. SVP réessayez!'));
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

  const handleSelectWilaya = (wilayaCode) => {
    setWilayaCode(wilayaCode);
    setSelectedCommune(null);
  };

  const handleSelectCommune = (id, name) => {
    setCommuneCode(id);
    setSelectedCommuneName(name);
  };

  return (
    <Box className='main-container'>
      <SuccessSnackbar
        open={isSuccessOpen}
        onClose={handleToastClose}
        successMsg={successMsg}
      />
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
                  src={imageFile || user.image} 
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
                      value={user.first_name || ""} 
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
                      value={user.phone || ""} 
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
                    <Wilayas handleSelectWilaya={handleSelectWilaya} selectedCode={wilayaCode} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Communes selectedWilayaCode={wilayaCode} selectedCommune={communeCode} onSelectCommune={handleSelectCommune} />
                  </Grid>
                </Grid>
                <Box display='flex' justifyContent='center' mt={2}>
                  <Button variant='contained' color='primary' type='submit'>
                    {t('Edit Profile')}
                  </Button>
                </Box>
                <Grid container justifyContent='center' mt='3%'>
                  <Grid item>
                    <Link href='/change_password' variant='body2'>
                      {t('Changer le mot de passe')}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
          {error && (
            <Typography variant='body1' color='error'>
              {t(error)}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
