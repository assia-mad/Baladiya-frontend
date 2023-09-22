import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Button, Typography, Input } from '@mui/material';
import { useMediaQuery, styled } from '@mui/material';
import StateMenuSelect from '../../../../Tools/StateMenu';
import apiInstance from '../../../../../../API';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';


const AgendaDetails = ({ mode, handleChange, handleSwitchChange, handleCreate, handleUpdate, modifiedAgenda, handleImageUpload }) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const [date, setDate] = useState(mode === 'update' ? new Date(modifiedAgenda.date) : new Date());
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  if (mode==="update"){
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const response = await apiInstance.get(`/manage_users/${modifiedAgenda.owner}/`);
          setOwnerName(response?.first_name + ' ' + response?.last_name);
          console.log("theeeee owner",ownerName);
        } catch (error) {
          console.log('Error fetching owner name', error);
        }
      };
  
      fetchOwnerName();
    }, [modifiedAgenda.owner])};

  return (
    <Box m={15} ml={mode === "update" ? 15 : 30} mr={mode === "update" ? 15 : 30}>
      <Grid container spacing={1} alignItems="center" direction={isMobile ? 'column' : 'row'}>
      {mode === "update" && (
          <Grid item xs={isMobile ? 12 : 5}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '20px' }}>
              <img
                src={modifiedAgenda.image}
                alt="Agenda image"
                style={{
                  width: '80%',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <label htmlFor="image-upload-update">
                <Input
                  accept="image/*"
                  id="image-upload-update"
                  type="file"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <Button component="span" variant="outlined">
                  {t('Change Image')}
                </Button>
              </label>
            </div>
          </Grid>
        )}
        <Grid item xs={(isMobile || mode === "create") ? 12 : 7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className='title'>
                {t('Agenda')}
              </Typography>
            </Grid>
            {mode === "update" && (
              <>
                <Grid item xs={6}>
                <TextField
                    name="date"
                    label={t('date')}
                    fullWidth
                    value={modifiedAgenda.created_at}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    name="owner"
                    label={t('Propriétaire')}
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
                    label={t('Titre')}
                    fullWidth
                    value={modifiedAgenda.title}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
            <TextField
                name="description"
                label={t('Description')}
                multiline
                fullWidth
                value={modifiedAgenda.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    name="localisation"
                    label="localisation"
                    multiline
                    fullWidth
                    value={modifiedAgenda.localisation}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DateTimePicker 
                onChange={setDate}
                value={date}
                format="dd-MM-yyyy HH:mm"
              />
            </Grid>
            {mode === "create" && (
              <Grid item xs={12}>
                <label
                  htmlFor="image-upload"
                  style={{ display: "block", marginTop: "8px" }}
                >
                  {t("Upload Image")}
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </Grid>
            )}
            {mode === "update" &&            
            <Grid item xs={12}>
            <StateMenuSelect currentState={modifiedAgenda.state} onChangeState={(newState) => handleSwitchChange(modifiedAgenda.id, newState)} />
            </Grid>
            }
            <Grid item xs={12}>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={ () => {mode === "update" ? handleUpdate(date) : handleCreate(date)}}>
                  {mode === 'update' ? t('save') : t('Créer')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgendaDetails;
