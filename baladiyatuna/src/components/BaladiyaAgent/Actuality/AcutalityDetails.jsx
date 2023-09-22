import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Button, Typography, Input, MenuItem } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import StateMenuSelect from '../../Tools/StateMenu';
import apiInstance from '../../../../API';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

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

  if (mode === 'update') {
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const response = await apiInstance.get(`/manage_users/${modifiedActuality.owner}/`);
          setOwnerName(response?.first_name + ' ' + response?.last_name);
        } catch (error) {
          console.log('Error fetching owner name', error);
        }
      };

      fetchOwnerName();
    }, [modifiedActuality.owner]);
  }
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    handleChange(event);
  };

  return (
    <Box m={15} ml={mode === 'update' ? 15 : 30} mr={mode === 'update' ? 15 : 30}>
      <Grid container spacing={1} alignItems="center" direction={isMobile ? 'column' : 'row'}>
        {mode === 'update' && (
          <Grid item xs={isMobile ? 12 : 5}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '20px' }}>
              {modifiedActuality.file && (modifiedActuality.file.endsWith('.jpg') || modifiedActuality.file.endsWith('.jpeg') || modifiedActuality.file.endsWith('.png')) ? (
                <img
                  src={modifiedActuality.file}
                  alt="Actuality file"
                  style={{
                    width: '80%',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <video controls style={{ width: '80%', display: 'block', marginTop: '8px', border: '1px solid #ccc', padding: '4px', height:'100%' }}>
                  <source src={modifiedActuality.file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <label htmlFor="file-upload-update" >
                <Input
                  accept="image/*,video/*"
                  id="file-upload-update"
                  type="file"
                  onChange={handleFileUpload}
                  style={{ display: 'none', height: '90%' }}
                />
                <Button component="span" variant="outlined">
                  {t('Changer le ficher')}
                </Button>
              </label>
            </div>
          </Grid>
        )}
        <Grid item xs={(isMobile || mode === 'create') ? 12 : 7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className='title'>
                {t('Actualité')}
              </Typography>
            </Grid>
            {mode === 'update' && (
              <>
                <Grid item xs={6}>
                  <TextField
                    name="created_at"
                    label={t('Created At')}
                    fullWidth
                    value={modifiedActuality.created_at}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="owner"
                    label={t('Owner')}
                    fullWidth
                    value={ownerName}
                    disabled
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                name="title"
                label={t('Title')}
                fullWidth
                value={modifiedActuality.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('Description')}
                multiline
                fullWidth
                value={modifiedActuality.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <DateTimePicker
                onChange={setDate}
                value={date}
                format="dd-MM-yyyy HH:mm"
              />
            <Grid item xs={6} ml={10}>
                <TextField
                    name="type"
                    label={t('Type')}
                    select
                    fullWidth
                    value={selectedType !== '' ? selectedType : modifiedActuality.type}
                    onChange={handleTypeChange}
                    style={{ width: '100%' }}
                >
                    <MenuItem value="Realisation">{t('Realisation')}</MenuItem>
                    <MenuItem value="Education">{t('Education')}</MenuItem>
                    <MenuItem value="Entreprise">{t('Entreprise')}</MenuItem>
                    <MenuItem value="Sport">{t('Sport')}</MenuItem>
                </TextField>
                </Grid>
            </Grid>
            {mode === 'create' && (
              <Grid item xs={12}>
                <label
                  htmlFor="file-upload"
                  style={{ display: 'block', marginTop: '8px' }}
                >
                  {t('Télecharger un fichier')}
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </Grid>
            )}
            {mode === 'update' &&
              <Grid item xs={12}>
                <StateMenuSelect currentState={modifiedActuality.state} onChangeState={(newState) => handleSwitchChange(modifiedActuality.id, newState)} />
              </Grid>
            }
            <Grid item xs={12}>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => { mode === 'update' ? handleUpdate(date) : handleCreate(date) }}>
                  {mode === 'update' ? t('Save') : t('Create')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActualityDetails;
