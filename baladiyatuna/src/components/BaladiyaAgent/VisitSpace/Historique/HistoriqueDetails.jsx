import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Button, useMediaQuery } from '@mui/material';
import { LocalizationProvider, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StateMenuSelect from '../../../Tools/StateMenu';
import Communes from '../../../Tools/Communes';
import Wilayas from '../../../Tools/Wilayas';
import PrimaryColorText from '../../../Tools/Title';
import apiInstance from '../../../../../API';

const HistoriqueDetails = ({
    mode,
    handleChange,
    handleSwitchChange,
    handleCreate,
    handleUpdate,
    modifiedHistorique,
    selectedCommune,
    setSelectedCommune,
    historiqueWilaya,
    setCommuneCode,
    communeCode,
    setSelectedCommuneName,
}) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());
  const [ownerName, setOwnerName] = useState('');
  const [wilayaCode, setWilayaCode] = useState(null);

  useEffect(() => {
    if (mode === 'update' && modifiedHistorique) {
      setDate(new Date(modifiedHistorique.date || new Date()));
      if (modifiedHistorique.owner) {
        fetchOwnerName();
      }
    }
  }, [mode, modifiedHistorique]);

  const fetchOwnerName = async () => {
    try {
      const response = await apiInstance.get(`/manage_users/${modifiedHistorique.owner}/`);
      setOwnerName(response?.first_name + ' ' + response?.last_name);
    } catch (error) {
      console.log('Error fetching owner name', error);
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

  const handleDateChange = (newDate) => {
    setDate(newDate || new Date());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 20, mr: 20, ml: 20 }}>
        <PrimaryColorText className='title'>
          {t('Historique')}
        </PrimaryColorText>
        <Grid container spacing={2}>
          {mode === "update" && (
            <>
              <Grid item xs={6}>
                <TextField
                  name="created_at"
                  label={t('Date')}
                  fullWidth
                  value={modifiedHistorique.created_at}
                  InputLabelProps={{ shrink: true }} 
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="owner"
                  label={t('Owner')}
                  fullWidth
                  value={ownerName}
                  InputLabelProps={{ shrink: true }} 
                  disabled
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              name="event"
              label={t('Event')}
              fullWidth
              value={modifiedHistorique.event || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }} 
            />
          </Grid>
          <Grid item xs={6}>
            <Wilayas 
              handleSelectWilaya={handleSelectWilaya} 
              selectedCode={modifiedHistorique.wilayaCode || historiqueWilaya} 
            />
          </Grid>
          <Grid item xs={6}>
            <Communes 
              selectedWilayaCode={modifiedHistorique.wilayaCode || historiqueWilaya} 
              selectedCommune={communeCode || selectedCommune} 
              onSelectCommune={handleSelectCommune}
            />
          </Grid>
          <Grid item xs={12}>
            <DesktopDateTimePicker
              label={t('Date & Time')}
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          {mode === "update" && (
            <Grid item xs={6}>
              <StateMenuSelect 
                currentState={modifiedHistorique.state} 
                onChangeState={(newState) => handleSwitchChange(modifiedHistorique.id, newState)} 
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Box mt={2}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => mode === "update" ? handleUpdate(date) : handleCreate(date)}
              >
                {mode === 'update' ? t('Modifier') : t('Créer')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default HistoriqueDetails;
