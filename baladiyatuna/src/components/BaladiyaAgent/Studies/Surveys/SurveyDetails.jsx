// SurveyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Typography, Paper } from '@mui/material';
import apiInstance from '../../../../../API';
import ChoicesList from '../../Choices/Choices';
import PrimaryColorText from '../../../Tools/Title';
import ReusableButton from '../../../Tools/SaveButton';

const SurveyDetails = ({ modifiedSurvey, mode, handleCreate, handleUpdate, handleChange }) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const [surveyChoices, setSurveyChoices] = useState([]);

  const fetchSurveyChoices = async () => {
    try {
      if (modifiedSurvey && modifiedSurvey.id) { 
        const response = await apiInstance.get(`/choices/?survey=${modifiedSurvey.id}`);
        setSurveyChoices(response); 
      }
    } catch (error) {
      console.log('Error fetching survey choices', error);
    }
  };
  
  const fetchOwnerName = async () => {
    try {
      if (modifiedSurvey && modifiedSurvey.owner) { 
        const response = await apiInstance.get(`/manage_users/${modifiedSurvey.owner}/`);
        setOwnerName(response?.first_name + ' ' + response?.last_name); 
      }
    } catch (error) {
      console.log('Error fetching owner name', error);
    }
  };
  if (mode === 'update') {
    useEffect(() => {
      
        fetchOwnerName();
        fetchSurveyChoices();
      
    }, [modifiedSurvey.id]); 
  }
  return (
    <Paper elevation={3} style={{ padding: '30px', margin: '70px' }} >
      <Grid container spacing={2}>
      <Grid item xs={12}>
              <PrimaryColorText gutterBottom className='title'>
                {t('Sondage')}
              </PrimaryColorText>
      </Grid>
        {mode === 'update' && (
          <>
            <Grid item xs={12}>
              <TextField
                name="owner"
                label={t('Propriétaire')}
                fullWidth
                value={ownerName}
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              name="date"
              label={t('date')}
              fullWidth
              value={modifiedSurvey.created_at}
              margin="normal"
              disabled
              InputLabelProps={{
                shrink: true, 
              }}
            />
          </Grid>

          </>
        )}
        <Grid item xs={12}>
          <TextField
            name="title"
            label={t('Titre')}
            fullWidth
            value={modifiedSurvey.title}
            margin="normal"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label={t('Description')}
            multiline
            fullWidth
            value={modifiedSurvey.description}
            margin="normal"
            onChange={handleChange}
          />
        </Grid>
          <Grid item xs={12} justifyContent="center">
              <ReusableButton
                size='large' 
                label={mode === 'update' ? t('Modifier') : t('Créer')}
                onClick={() => (mode === 'update' ? handleUpdate() : handleCreate())}
              />
            </Grid>
      </Grid>
      {mode === 'update' && (
        <Box mt={3}>
          <ChoicesList choices={surveyChoices} />
        </Box>
      )}
    </Paper>
  );
};

export default SurveyDetails;
