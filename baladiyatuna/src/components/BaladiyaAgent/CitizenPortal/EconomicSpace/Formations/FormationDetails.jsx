import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Button, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../../../API';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PrimaryColorText from "../../../../Tools/Title";
import Wilayas from "../../../../Tools/Wilayas";
import Communes from "../../../../Tools/Communes";

const EconomicFormationDetails = ({ mode,
   handleChange,
  handleUpdate,
  handleCreate,
  modifiedFormation,
  selectedCommune,
  setSelectedCommune,
  topicWilaya,
  setCommuneCode,
  communeCode,
  setSelectedCommuneName, }) => {
  const [ownerName, setOwnerName] = useState('');
  const { t } = useTranslation();
  const [date, setDate] = useState(mode === 'update' ? new Date(modifiedFormation.date) : new Date());
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [wilayaCode, setWilayaCode] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (mode === "update") {
    fetchOwnerName();
    };
    fetchCurrentUser();
  }, [modifiedFormation.owner]);


const fetchOwnerName = async () => {
  try {
    const response = await apiInstance.get(
      `/manage_users/${modifiedFormation.owner}/`
    );
    setOwnerName(
      response?.first_name + " " + response?.last_name
    );
  } catch (error) {
    console.log("Error fetching owner name", error);
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
    <Box mt={10} ml={mode === 'update' ? 20 : 30} mr={mode === 'update' ? 20 : 30}>
      <Grid container alignItems="center" direction={isMobile ? 'column' : 'row'}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PrimaryColorText className="title">
                {t('Formation Economique')}
              </PrimaryColorText>
            </Grid>
            {mode === 'update' && (
              <>
                <Grid item xs={6}>
                  <TextField
                    name="date"
                    label="Date"
                    fullWidth
                    value={modifiedFormation.created_at}
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
                label="Title"
                fullWidth
                value={modifiedFormation.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                multiline
                fullWidth
                value={modifiedFormation.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="localisation"
                label="Localisation"
                multiline
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
    </LocalizationProvider>
  );
};

export default EconomicFormationDetails;
