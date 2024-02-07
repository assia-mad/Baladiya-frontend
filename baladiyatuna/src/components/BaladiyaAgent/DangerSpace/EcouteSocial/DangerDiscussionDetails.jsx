import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Typography, Input, Paper } from '@mui/material';
import StateMenuSelect from '../../../Tools/StateMenu';
import apiInstance from '../../../../../API';
import { useMediaQuery } from '@mui/material';
import Comment from '../../../Comments/Comment';
import PrimaryColorText from '../../../Tools/Title';


const DangerDiscussionDetails = ({ modifiedDiscussion, comments, handleSwitchChange }) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchOwnerName = async () => {
      try {
        const response = await apiInstance.get(`/manage_users/${modifiedDiscussion.owner}/`);
        setOwnerName(response?.first_name + ' ' + response?.last_name);
      } catch (error) {
        console.log('Error fetching owner name', error);
      }
    };

    fetchOwnerName();
  }, [modifiedDiscussion.owner]);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '80px' }}>
      <Grid container spacing={2}>
        <Grid item xs={isMobile ? 12 : 5}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginTop: '10px',
              height: '100%', 
            }}
          >
            <div
              style={{
                width: '100%', 
                maxWidth: '400px', 
                maxHeight: '400px', 
              }}
            >
              <img
                src={modifiedDiscussion.image}
                alt="discussion image"
                style={{
                  width: '100%', 
                  height: '100%',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={isMobile ? 12 : 7}>
          <PrimaryColorText variant="h6" gutterBottom className='title'>
            {t('Ecoute Social')}
          </PrimaryColorText>
          <TextField name="date" label={t('date')} fullWidth value={modifiedDiscussion.created_at} margin="normal" />
          <TextField name="owner" label={t('Propriétaire')} fullWidth value={ownerName} margin="normal" />
          <TextField name="title" label={t('Titre')} fullWidth value={modifiedDiscussion.title} margin="normal" />
          <TextField
            name="description"
            label={t('Description')}
            multiline
            fullWidth
            value={modifiedDiscussion.description}
            margin="normal"
          />
          <StateMenuSelect currentState={modifiedDiscussion.state} onChangeState={(newState) => handleSwitchChange(modifiedDiscussion.id, newState)} />
        </Grid>
      </Grid>
      <Box mt={3}>
        <Typography variant="h6" gutterBottom className='title'>
          Comments
        </Typography>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Box>
    </Paper>
  );
};

export default DangerDiscussionDetails;
