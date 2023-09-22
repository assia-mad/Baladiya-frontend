import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Button, Typography } from '@mui/material';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../../API';
import StateMenuSelect from '../../../Tools/StateMenu';


const AudienceDemandDetails = ({ mode, handleChange, handleSwitchChange, handleUpdate, handleCreate, modifiedDemand }) => {
  const [ownerName, setOwnerName] = useState('');
  const { t } = useTranslation();
  const [date, setDate] = useState(mode === 'update' ? new Date(modifiedDemand.date) : new Date());
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  
  if (mode === 'update') {
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const response = await apiInstance.get(`/manage_users/${modifiedDemand.owner}/`);
          setOwnerName(response?.first_name + ' ' + response?.last_name);
          console.log("theeeee owner", ownerName);
        } catch (error) {
          console.log('Error fetching owner name', error);
        }
      };

      fetchOwnerName();
    }, [modifiedDemand.owner]);
  }

  return (
    <Box mt={10} ml={mode === 'update' ? 20 : 30} mr={mode === 'update' ? 20 : 30}>
      <Grid container alignItems="center" direction={isMobile ? 'column' : 'row'}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className='title'>
                {t('Demande Audience')}
              </Typography>
            </Grid>
            {mode === 'update' &&
              <>
                <Grid item xs={6}>
                  <TextField
                    name="date"
                    label="Date"
                    fullWidth
                    value={modifiedDemand.created_at}
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
            }
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Titre"
                fullWidth
                value={modifiedDemand.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                multiline
                fullWidth
                value={modifiedDemand.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="person"
                label="Personne"
                fullWidth
                value={modifiedDemand.person}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DateTimePicker 
                onChange={setDate}
                value={date}
                format="dd-MM-yyyy HH:mm"
              />
            </Grid>
            {mode === 'update' &&
              <Grid item xs={12}>
                <StateMenuSelect
                  currentState={modifiedDemand.state}
                  onChangeState={(newState) => handleSwitchChange(modifiedDemand.id, newState)}
                />
              </Grid>
            }
            <Grid item xs={12}>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => { mode === 'update' ? handleUpdate(date) : handleCreate(date) }}
                >
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

export default AudienceDemandDetails;
