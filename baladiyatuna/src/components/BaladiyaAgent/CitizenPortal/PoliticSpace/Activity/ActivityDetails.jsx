import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Button, FormControlLabel, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import apiInstance from '../../../../../../API';

const ActivityDetails = ({ mode, handleChange, handleUpdate, handleCreate, modifiedActivity }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(mode === 'update' ? new Date(modifiedActivity.date) : new Date());
  const [ownerName, setOwnerName] = useState('');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  if (mode === "update") {
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const response = await apiInstance.get(
            `/manage_users/${modifiedActivity.owner}/`
          );
          setOwnerName(
            response?.first_name + " " + response?.last_name
          );
         console.log('the owner iiiis',ownerName); 
        } catch (error) {
          console.log("Error fetching owner name", error);
        }
      };

      fetchOwnerName();
    }, [modifiedActivity.owner]);
  }

  return (
    <Box mt={10} ml={mode === 'update' ? 20 : 30} mr={mode === 'update' ? 20 : 30}>
      <Grid container alignItems="center" direction={isMobile ? 'column' : 'row'}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className="title">{t('Activity')}</Typography>
            </Grid>
            {mode === 'update' && (
              <>
                <Grid item xs={6}>
                  <TextField name="date" label={t("Date de creation")} fullWidth value={modifiedActivity.created_at} disabled />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="owner" label="Owner" fullWidth value={ownerName} disabled />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                fullWidth
                value={modifiedActivity.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                multiline
                fullWidth
                value={modifiedActivity.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="directed_by"
                label="Directed By"
                fullWidth
                value={modifiedActivity.directed_by}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DateTimePicker onChange={setDate} value={date} format="dd-MM-yyyy HH:mm" />
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => (mode === 'update' ? handleUpdate(date) : handleCreate(date))}>
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

export default ActivityDetails;
