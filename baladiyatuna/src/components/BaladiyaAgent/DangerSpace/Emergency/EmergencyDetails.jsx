import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Button, Typography, MenuItem } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../../API';
import StateMenuSelect from '../../../Tools/StateMenu';

const EmergencyDetails = ({ mode, handleChange, handleSwitchChange, handleUpdate, handleCreate, modifiedEmergency }) => {
  const [ownerName, setOwnerName] = useState('');
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  if (mode === 'update') {
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const response = await apiInstance.get(`/manage_users/${modifiedEmergency.owner}/`);
          setOwnerName(response?.first_name + ' ' + response?.last_name);
        } catch (error) {
          console.log('Error fetching owner name', error);
        }
      };

      fetchOwnerName();
    }, [modifiedEmergency.owner]);
  }

  return (
    <Box mt={10} ml={mode === 'update' ? 20 : 30} mr={mode === 'update' ? 20 : 30}>
      <Grid container alignItems="center" direction={isMobile ? 'column' : 'row'}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className='title'>
                {t('Emergency')}
              </Typography>
            </Grid>
            {mode === 'update' &&
              <>
                <Grid item xs={6}>
                  <TextField
                    name="date"
                    label="Date"
                    fullWidth
                    value={modifiedEmergency.created_at}
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
                value={modifiedEmergency.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                multiline
                fullWidth
                value={modifiedEmergency.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="type"
                select
                label="Type"
                fullWidth
                value={modifiedEmergency.type}
                onChange={handleChange}
              >
                <MenuItem value="Gaz">{t('Gaz')}</MenuItem>
                <MenuItem value="Incendie">{t('Incendie')}</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="public"
                select
                label="Public"
                fullWidth
                value={modifiedEmergency.public}
                onChange={handleChange}
              >
                <MenuItem value={true}>{t('Oui')}</MenuItem>
                <MenuItem value={false}>{t('Non')}</MenuItem>
              </TextField>
            </Grid>
            {mode === 'update' &&
              <Grid item xs={12}>
                <StateMenuSelect
                  currentState={modifiedEmergency.state}
                  onChangeState={(newState) => handleSwitchChange(modifiedEmergency.id, newState)}
                />
              </Grid>
            }
            <Grid item xs={12}>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => { mode === 'update' ? handleUpdate() : handleCreate() }}
                >
                  {mode === 'update' ? t('Enregister') : t('Créer')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmergencyDetails;
