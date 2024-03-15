import React, { useState, useEffect } from 'react';
import {
  TextField, Grid, Box, Button, Typography, Paper, useMediaQuery, useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../../../API';
import 'react-datetime-picker/dist/DateTimePicker.css';
import PrimaryColorText from '../../../../Tools/Title';
import Wilayas from '../../../../Tools/Wilayas';
import Communes from '../../../../Tools/Communes';

const CreationStepDetails = ({ mode,
   handleChange,
    handleSave,
    creationStepData,
    selectedCommune,
    setSelectedCommune,
    topicWilaya,
    setCommuneCode,
    communeCode,
    setSelectedCommuneName, }) => {
  const [ownerName, setOwnerName] = useState('');
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [wilayaCode, setWilayaCode] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  const fetchOwnerName = async () => {
    try {
      const response = await apiInstance.get(`/manage_users/${creationStepData.owner}/`);
      setOwnerName(`${response.first_name} ${response.last_name}`);
    } catch (error) {
      console.error('Error fetching owner name', error);
    }
  };
  const fetchCurrentUser = async () => {
    try{
      const response = await apiInstance.get(`user/`);
      setIsAdmin(response.role==='Admin');
    } catch(error){

    }
};
  useEffect(() => {
    if (mode === 'update') {
      fetchOwnerName();
    };
    fetchCurrentUser();
  }, [mode, creationStepData.owner]);

  const handleRangChange = (value) => {
    handleChange({
      target: {
        name: 'rang',
        value: value >= 0 ? value : 0,
      },
    });
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ p: 2 }}
    >
      <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', width: '100%', p: isMobile ? 2 : 4 }}>
        <PrimaryColorText variant="h5" gutterBottom align="center" sx={{ mb: 3 }} className='title'>
          {mode === 'update' ? t('Modifier étape') : t('Ajouter une étape')}
        </PrimaryColorText>
        <Grid container spacing={3}>
          {mode === 'update' && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="date"
                  label={t('Date Created')}
                  value={creationStepData.created_at}
                  fullWidth
                  disabled
                  InputLabelProps={{ shrink: true }} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="owner"
                  label={t('Owner')}
                  value={ownerName}
                  fullWidth
                  disabled
                  InputLabelProps={{ shrink: true }} 
                />
              </Grid>
            </>
          )}
          {isAdmin && (
            <>
          <Grid item xs={6}>
              <Wilayas handleSelectWilaya={handleSelectWilaya} selectedCode={wilayaCode ? wilayaCode : topicWilaya} />
          </Grid>
          <Grid item xs={6}>
            <Communes selectedWilayaCode={wilayaCode ? wilayaCode : topicWilaya} selectedCommune={communeCode ? communeCode : selectedCommune} onSelectCommune={handleSelectCommune} />
          </Grid>
          </>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              name="rang"
              label={t('Rang')}
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={creationStepData.rang}
              InputLabelProps={{ shrink: true }} 
              onChange={(e) => handleRangChange(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="title"
              label={t('Title')}
              fullWidth
              value={creationStepData.title}
              InputLabelProps={{ shrink: true }} 
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label={t('Description')}
              multiline
              fullWidth
              value={creationStepData.description}
              InputLabelProps={{ shrink: true }} 
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              {mode === 'update' ? t('Enregistrer') : t('Créer')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CreationStepDetails;
