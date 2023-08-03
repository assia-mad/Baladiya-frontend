import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Button, Typography } from '@mui/material';
import StateMenuSelect from '../Tools/StateMenu';
import { useMediaQuery } from '@mui/material';
import apiInstance from '../../../API';

const TopicDetails = ({ handleChange, handleSwitchChange, handleUpdate, modifiedTopic }) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchOwnerName = async () => {
      try {
        const response = await apiInstance.get(`/manage_users/${modifiedTopic.owner}/`);
        setOwnerName(response?.data?.first_name + ' ' + response?.data?.last_name);
        console.log("theeeee owner", ownerName);
      } catch (error) {
        console.log('Error fetching owner name', error);
      }
    };

    fetchOwnerName();
  }, [modifiedTopic.owner]);

  return (
    <Box m={15}>
      <Grid container spacing={1} alignItems="center" direction={isMobile ? 'column' : 'row'}>
        <Grid item xs={isMobile ? 12 : 5}>
          <img
            src={modifiedTopic.image}
            alt="topic image"
            style={{
              width: '80%',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        </Grid>
        <Grid item xs={isMobile ? 12 : 7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className='title'>
                {t('Sujet sportif')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="date"
                label={t('date')}
                fullWidth
                value={modifiedTopic.created_at}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="owner"
                label={t('Propriétaire')}
                fullWidth
                value={ownerName}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="title"
                label={t('Titre')}
                fullWidth
                value={modifiedTopic.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('Description')}
                multiline
                fullWidth
                value={modifiedTopic.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <StateMenuSelect currentState={modifiedTopic.state} onChangeState={(newState) => handleSwitchChange(topic.id, newState)} />
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                  {t('Enregister')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopicDetails;
