import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Typography, Input, Paper } from '@mui/material';
import StateMenuSelect from '../../../../Tools/StateMenu';
import apiInstance from '../../../../../../API';
import { useMediaQuery } from '@mui/material';
import Comment from '../../../../Comments/Comment';
import PrimaryColorText from '../../../../Tools/Title';
import Wilayas from '../../../../Tools/Wilayas';
import Communes from '../../../../Tools/Communes';

const DiscussionDetails = ({ modifiedDiscussion,
   comments,
    handleSwitchChange,
    selectedCommune,
    setSelectedCommune,
    topicWilaya,
    setCommuneCode,
    communeCode,
    setSelectedCommuneName,
}) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [wilayaCode, setWilayaCode] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchOwnerName = async () => {
    try {
      const response = await apiInstance.get(`/manage_users/${modifiedDiscussion.owner}/`);
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

  useEffect(() => {
    fetchOwnerName();
    fetchCurrentUser();
  }, [modifiedDiscussion.owner]);

  const handleSelectWilaya = (wilayaCode) => {
    setWilayaCode(wilayaCode);
    setSelectedCommune(null); 
  };

  const handleSelectCommune = (id, name) => {
    setCommuneCode(id);
    setSelectedCommuneName(name);
  };

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
          <PrimaryColorText className='title'>
            {t('Discussion Politique')}
          </PrimaryColorText>
          <TextField name="date" label={t('date')} fullWidth value={modifiedDiscussion.created_at} margin="normal" />
          <TextField name="owner" label={t('Propriétaire')} fullWidth value={ownerName} margin="normal" />
          {isAdmin && (
            <>
              <Wilayas handleSelectWilaya={handleSelectWilaya} selectedCode={wilayaCode ? wilayaCode : topicWilaya} />
              <Box mt={2}>
                <Communes selectedWilayaCode={wilayaCode ? wilayaCode : topicWilaya} selectedCommune={communeCode ? communeCode : selectedCommune} onSelectCommune={handleSelectCommune} />
              </Box>
          </>
          )}
          <TextField name="title" label={t('Titre')} fullWidth value={modifiedDiscussion.title} margin="normal" />
          <TextField
            name="description"
            label={t('Description')}
            multiline
            rows={4}
            fullWidth
            value={modifiedDiscussion.description}
            margin="normal"
          />
          <StateMenuSelect currentState={modifiedDiscussion.state} onChangeState={(newState) => handleSwitchChange(modifiedDiscussion.id, newState)} />
        </Grid>
      </Grid>
      <Box mt={3}>
        <PrimaryColorText gutterBottom className='title'>
          Comments
        </PrimaryColorText>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Box>
    </Paper>
  );
};

export default DiscussionDetails;
