import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Button, Typography, Input, MenuItem, Stack } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PhotoCamera } from '@mui/icons-material';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import StateMenuSelect from '../../Tools/StateMenu';
import apiInstance from '../../../../API';
import PrimaryColorText from '../../Tools/Title';


const ActualityDetails = ({
  mode,
  handleChange,
  handleSwitchChange,
  handleCreate,
  handleUpdate,
  modifiedActuality,
  handleFileUpload,
}) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const [selectedType, setSelectedType]= useState('');
  const [date, setDate] = useState(mode === 'update' ? new Date(modifiedActuality.created_at) : new Date());
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [userRole, setUserRole] = useState('');


  if (mode === 'update') {
    const fetchOwnerName = async () => {
      try {
        const response = await apiInstance.get(`/manage_users/${modifiedActuality.owner}/`);
        setOwnerName(response?.first_name + ' ' + response?.last_name);
      } catch (error) {
        console.log('Error fetching owner name', error);
      }
    };
    useEffect(() => {
      fetchOwnerName();
    }, [modifiedActuality.owner]);
  }
  useEffect(() => {
    if (mode === 'update' && modifiedActuality.date) {
      setDate(new Date(modifiedActuality.date)); 
    } else {
      setDate(new Date()); 
    }
  }, [mode, modifiedActuality.date]);
  const fetchUserRole = async () => {
    try {
      const response = await apiInstance.get('user/');
      setUserRole(response?.role); 
      console.log("rooooooooooooooooooooooole",response.role);
    } catch (error) {
      console.log('Error fetching user role', error);
    }
  };
  useEffect(() => {
    fetchUserRole()
  }, [modifiedActuality.owner]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    handleChange(event);
  };
  const handleDateChange = (newDate) => {
    if (newDate) {
      setDate(newDate);
    } else {
      setDate(new Date());
    }
  };

  const isAdmin = userRole === 'Admin';

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Box sx={{ mt: 15, mr:20, ml:20, mb:10 }}>
      <PrimaryColorText className="title" >{t('Actualité')}</PrimaryColorText>
      <Grid container spacing={2}>
      {mode === 'update' && (
            <Grid item xs={12} md={5}>
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                {/* Conditional rendering based on file type */}
                {modifiedActuality.file && (modifiedActuality.file.endsWith('.jpg') || modifiedActuality.file.endsWith('.jpeg') || modifiedActuality.file.endsWith('.png')) ? (
                  <img
                    src={modifiedActuality.file}
                    alt="Actuality file"
                    style={{
                      maxWidth: '100%',
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <video
                    controls
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  >
                    <source src={modifiedActuality.file} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {/* File upload input */}
                <input
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  id="file-input"
                  type="file"
                  onChange={handleFileUpload}
                />

                {/* Upload button */}
                <label htmlFor="file-input">
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ mt: 2 }}
                  >
                   {t('Changer Fichier')} 
                  </Button>
                </label>
              </Box>
            </Grid>
          )}

        <Grid item xs={12} md={mode === 'update' ? 7 : 12}>
          <Grid container spacing={2}>
            {mode === 'update' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    disabled
                    label={t('Created At')}
                    value={modifiedActuality.created_at}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    disabled
                    label={t('Owner')}
                    value={ownerName}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('Title')}
                name="title"
                value={modifiedActuality.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('Description')}
                name="description"
                multiline
                rows={4}
                value={modifiedActuality.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <DesktopDateTimePicker
              label={t('Date & Time')}
              value={date}
              onChange={handleDateChange}  
              renderInput={(params) => <TextField {...params} />}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label={t('Type')}
              name="type"
              value={mode === 'update' ? modifiedActuality.type : selectedType}
              onChange={handleTypeChange}
            >
                
                {isAdmin ? (
                  [
                    <MenuItem key="education" value="Education">
                      {t('Education')}
                    </MenuItem>,
                    <MenuItem key="entreprise" value="Entreprise">
                      {t('Entreprise')}
                    </MenuItem>,
                  ]
                ) : (
                  [
                    <MenuItem key="realisation" value="Realisation">
                      {t('Realisation')}
                    </MenuItem>,
                    <MenuItem key="education" value="Education">
                      {t('Education')}
                    </MenuItem>,
                    <MenuItem key="entreprise" value="Entreprise">
                      {t('Entreprise')}
                    </MenuItem>,
                    <MenuItem key="sport" value="Sport">
                      {t('Sport')}
                    </MenuItem>,
                  ]
                )}
              </TextField>
            </Grid>
            {mode === 'create' && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                  />
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
            <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => mode === 'update' ? handleUpdate(date) : handleCreate(date)}
                >
                  {mode === 'update' ? t('Save') : t('Create')}
            </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </LocalizationProvider>
  );
};

export default ActualityDetails;
