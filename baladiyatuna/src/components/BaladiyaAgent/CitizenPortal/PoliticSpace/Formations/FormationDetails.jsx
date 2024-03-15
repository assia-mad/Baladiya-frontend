import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Button, Typography } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../../../API';
import StateMenuSelect from '../../../../Tools/StateMenu';
import PrimaryColorText from '../../../../Tools/Title';
import Wilayas from '../../../../Tools/Wilayas';
import Communes from '../../../../Tools/Communes';

const FormationDetails = ({
  mode,
  handleChange,
  handleSwitchChange,
  handleCreate,
  handleUpdate,
  modifiedFormation,
  selectedCommune,
  setSelectedCommune,
  topicWilaya,
  setCommuneCode,
  communeCode,
  setSelectedCommuneName,
}) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const [date, setDate] = useState(mode === 'update' && modifiedFormation.date ? new Date(modifiedFormation.date) : new Date());
  const [wilayaCode, setWilayaCode] = useState(null);
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(() => {
    if (mode === 'update' && modifiedFormation.owner) {
      fetchOwnerName();
    }
    fetchCurrentUser();
  }, [mode, modifiedFormation.owner]);

  const fetchOwnerName = async () => {
    try {
      const response = await apiInstance.get(`/manage_users/${modifiedFormation.owner}/`);
      setOwnerName(response?.first_name + ' ' + response?.last_name);
    } catch (error) {
      console.log('Error fetching owner name', error);
    }
  };
  
  const fetchCurrentUser = async () => {
        try{
          const response = await apiInstance.get(`user/`);
          setIsAdmin(response.role==='Admin');
        } catch(error){

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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt:10, mx: 30 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PrimaryColorText className="title">{t('Formation')}</PrimaryColorText>
          </Grid>
          {mode === 'update' && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('Owner')}
                  value={ownerName}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('Creation Date')}
                  value={modifiedFormation.created_at}
                  disabled
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
          <Grid item xs={12}>
            <TextField
              name="title"
              label={t('Titre')}
              fullWidth
              value={modifiedFormation.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label={t('Description')}
              multiline
              rows={4}
              fullWidth
              value={modifiedFormation.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="localisation"
              label={t('Localisation')}
              fullWidth
              value={modifiedFormation.localisation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label={t('Date')}
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          {mode === 'update' && (
            <Grid item xs={12}>
              <StateMenuSelect
                currentState={modifiedFormation.state}
                onChangeState={(newState) => handleSwitchChange(modifiedFormation.id, newState)}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => mode === 'update' ? handleUpdate(date) : handleCreate(date)}
            >
              {mode === 'update' ? t('Modifier') : t('Créer')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default FormationDetails;
