import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Button, FormControlLabel, Typography } from '@mui/material';
import {useMediaQuery} from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../../../API';
import StateMenuSelect from '../../../../Tools/StateMenu';

const FormationDetails = ({handleChange, handleSwitchChange, handleUpdate, modifiedFormation}) => {
  const [ownerName, setOwnerName] = useState('');
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchOwnerName = async () => {
      try {
        const response = await apiInstance.get(`/manage_users/${modifiedFormation.owner}/`);
        setOwnerName(response?.first_name + ' ' + response?.last_name);
        console.log("theeeee owner",ownerName);
      } catch (error) {
        console.log('Error fetching owner name', error);
      }
    };

    fetchOwnerName();
  }, [modifiedFormation.owner]);
  return (
    <Box mt={10} ml={17} mr={17}>
      <Grid container  alignItems="center" direction={isMobile ? 'column' : 'row'}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className='title'>
              {t ('Formation Politique')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                  name="date"
                  label="date"
                  fullWidth
                  value={modifiedFormation.created_at}
                  disabled
                />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  name="owner"
                  label="owner"
                  fullWidth
                  value={ownerName}
                  disabled
                />
            </Grid>
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
                    label="localisation"
                    multiline
                    fullWidth
                    value={modifiedFormation.localisation}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    name="date"
                    label="date"
                    multiline
                    fullWidth
                    value={modifiedFormation.date}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
            <StateMenuSelect currentState={modifiedFormation.state} onChangeState={(newState) => handleSwitchChange(modifiedFormation.id, newState)} />
            </Grid>
            <Grid item xs={12}>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save
              </Button>
            </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormationDetails;
