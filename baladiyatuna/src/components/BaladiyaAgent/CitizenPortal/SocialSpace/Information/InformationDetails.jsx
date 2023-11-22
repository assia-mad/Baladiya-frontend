import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Button, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../../../API';
import 'react-datetime-picker/dist/DateTimePicker.css';
import PrimaryColorText from '../../../../Tools/Title';

const InformationDetails = ({ mode, handleChange, handleUpdate, handleCreate, modifiedInformation }) => {
  const [ownerName, setOwnerName] = useState('');
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  if (mode === 'update') {
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const response = await apiInstance.get(`/manage_users/${modifiedInformation.owner}/`);
          setOwnerName(response?.first_name + ' ' + response?.last_name);
        } catch (error) {
          console.log('Error fetching owner name', error);
        }
      };

      fetchOwnerName();
    }, [modifiedInformation.owner]);
  }

  return (
    <Box mt={10} ml={mode === 'update' ? 20 : 30} mr={mode === 'update' ? 20 : 30}>
      <Grid container alignItems="center" direction={isMobile ? 'column' : 'row'}>
        <Grid item xs={12}>
          <Grid container spacing={2} >
            <Grid item xs={12} >
              <PrimaryColorText className="title">
                {t('Information Social')}
              </PrimaryColorText>
            </Grid>
            {mode === 'update' && (
              <>
                <Grid item xs={6}>
                  <TextField
                    name="date"
                    label="Date"
                    fullWidth
                    value={modifiedInformation.created_at}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="owner"
                    label="Owner"
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
                label="Title"
                fullWidth
                value={modifiedInformation.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                multiline
                fullWidth
                value={modifiedInformation.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
              <Button variant="contained" color="primary" onClick={mode === 'update' ? handleUpdate : handleCreate}>
                  {mode === 'update' ? t('save') : t('Create')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformationDetails;
