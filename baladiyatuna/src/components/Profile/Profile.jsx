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
import ErrorSnackbar from '../Tools/ErrorSnackBar';
import PrimaryColorText from '../Tools/Title';


const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};
const getWilayaByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_name_ascii : null;
};

const Profile = () => {
  const { t } = useTranslation();
  const [successMsg, setSuccessMsg] = useState('');
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState('');
  const [wilaya, setWilaya]= useState('');
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
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorOpen, setErrorOpen] = useState(false);


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
      const wilaya = getWilayaByCommuneId(communeID);
      setWilaya(wilaya);
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
  
    if (imageChanged && imageFile) {
      formData.append('image', imageFile);
      console.log('theeeee sended file',imageFile);
    }
    

    try {
      await apiInstance.patch(`user/`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchUser();
      setSuccessOpen(true);
      setSuccessMsg(t('La modification a réussi!'));
    } catch (error) {
      console.log(error.response);
      const errorMessage = error.response?.message || t('Une erreur est apparue. SVP réessayez!');
      setErrorMsg(errorMessage);
      setErrorOpen(true);
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
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImageFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setImageChanged(true);
    }
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
      <ErrorSnackbar
        open={isErrorOpen}
        onClose={() => setErrorOpen(false)}
        errorMsg={errorMsg}
      />
      <Grid container direction='column' alignItems='center' spacing={4}>
        <Grid item mt={4}>
          <PrimaryColorText className="title">
            {t('Profile')}
          </PrimaryColorText>
        </Grid>
        <Grid item mt={2}>
          <Card>
            <Box display='flex' justifyContent='center' mt={2}>
              <CardMedia>
                <Avatar
                  alt={user.first_name}
                  src={imagePreview || user.image} 
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
                  <Grid item xs={6}>
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
                
                  <Grid item xs={6}>
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
                  {user.role ==='Admin' &&
                  <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        label={t('Wilaya')}
                        name='wilaya'
                        value={wilaya}
                        sx={{width:'100%'}}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        label={t('Commune')}
                        name='commune'
                        value={selectedCommune}
                        sx={{width:'100%'}}
                      />
                  </Grid>
                  </>
                  }
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
