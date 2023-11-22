import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import ReusableButton from '../../Tools/SaveButton';
import PrimaryColorText from '../../Tools/Title'
import apiInstance from '../../../../API';

const StudyDetails = ({
  mode,
  handleChange,
  handleCreate,
  handleUpdate,
  modifiedStudy,
}) => {
    const {t} = useTranslation();
    const [ownername, setOwnerName] = useState('');
    const isValidDate = (dateString) => {
      return !isNaN(Date.parse(dateString));
    };   
    const defaultDate = new Date();
    const initialDate = isValidDate(modifiedStudy.date) ? new Date(modifiedStudy.date) : defaultDate;
    const [date, setDate] = useState(initialDate);

    const fetchOwnerName = async () => {
      try {
        const response = await apiInstance.get(`/manage_users/${modifiedStudy.owner}/`);
        setOwnerName(response?.first_name + ' ' + response?.last_name);
        console.log(response?.first_name + ' ' + response?.last_name);
      } catch (error) {
      console.log('Error fetching owner name', error);
    }
  };

    {mode === "update" &&
      useEffect(() => {
        fetchOwnerName();
      }, [modifiedStudy.owner]);
    }


  return (
    <Box ml={45} mt={20} mr={45}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PrimaryColorText variant='h5' className='title'>
            {t("Etude")}
          </PrimaryColorText>
        </Grid>
        {mode === 'update' && (
          <Grid item xs={12}>
            <TextField
              name='owner'
              label={t('Propriétaire')}
              fullWidth
              value={ownername}
              disabled
            />
          </Grid>
        )}
        {mode === 'update' && (
          <Grid item xs={12}>
            <TextField
              name='created_at'
              label={t('Date de création')}
              fullWidth
              value={modifiedStudy.created_at}
              disabled
            />
          </Grid>
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
        <Grid item xs={12} >
              <DateTimePicker
                onChange={setDate}
                value={date}
                format="dd-MM-yyyy HH:mm"
              />
        </Grid>
        <Grid item xs={12} justifyContent="center">
          <ReusableButton
            size='large' 
            label={mode === 'update' ? 'Update' : 'Create'}
            onClick={() => (mode === 'update' ? handleUpdate(date) : handleCreate(date))}

          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudyDetails;
