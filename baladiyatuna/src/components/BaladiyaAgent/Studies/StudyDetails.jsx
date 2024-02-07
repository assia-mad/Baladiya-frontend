import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ReusableButton from '../../Tools/SaveButton';
import PrimaryColorText from '../../Tools/Title';
import apiInstance from '../../../../API';

const StudyDetails = ({
  mode,
  handleChange,
  handleCreate,
  handleUpdate,
  modifiedStudy,
}) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [ownerName, setOwnerName] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (mode === 'update' && modifiedStudy.date) {
      setDate(new Date(modifiedStudy.date));
    }
    if (mode === 'update' && modifiedStudy.owner) {
      fetchOwnerName();
    }
  }, [modifiedStudy, mode]);

  const fetchOwnerName = async () => {
    try {
      const response = await apiInstance.get(`/manage_users/${modifiedStudy.owner}/`);
      setOwnerName(response?.first_name + ' ' + response?.last_name);
    } catch (error) {
      console.log('Error fetching owner name', error);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate || new Date());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box ml={isMobile ? 2 : 30} mt={isMobile ? 2 : 10} mr={isMobile ? 2 : 30}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PrimaryColorText variant='h5' className='title'>
              {t("Etude")}
            </PrimaryColorText>
          </Grid>
          {mode === 'update' && (
            <>
              <Grid item xs={12}>
                <TextField
                  name='owner'
                  label={t('Propriétaire')}
                  fullWidth
                  value={ownerName}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='created_at'
                  label={t('Date de création')}
                  fullWidth
                  value={modifiedStudy.created_at}
                  disabled
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              name='title'
              label={t('Title')}
              fullWidth
              value={modifiedStudy.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='description'
              label={t('Description')}
              multiline
              fullWidth
              value={modifiedStudy.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <DesktopDateTimePicker
              label={t('Date')}
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} justifyContent="center">
            <ReusableButton
              size='large' 
              label={mode === 'update' ? t('Modifier') : t('Créer')}
              onClick={() => (mode === 'update' ? handleUpdate(date) : handleCreate(date))}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default StudyDetails;
