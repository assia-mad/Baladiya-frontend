import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  Input,
  TextField,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import apiInstance from '../../../../../API';
import LikedByList from '../../../Tools/Likes';
import Wilayas from '../../../Tools/Wilayas';
import StateMenuSelect from '../../../Tools/StateMenu';
import PrimaryColorText from '../../../Tools/Title';

const StyledTypography = styled(Typography)`
  font-size: 26px;
  font-family: sans-serif;
  font-weight: 900;
  line-height: 34px;
`;

const AlbumDetails = ({
  mode,
  modifiedAlbum,
  handleChange,
  handleCreate,
  handleUpdate,
  handleImageUpload,
  handleSwitchChange
}) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const [selectedCode, setSelectedCode] = useState("01");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [selectedWilaya, setSelectedWilaya] = useState('');

  useEffect(() => {
    const fetchOwnerName = async () => {
      try {
        const response = await apiInstance.get(`/manage_users/${modifiedAlbum.owner}/`);
        setOwnerName(response?.first_name + ' ' + response?.last_name);
      } catch (error) {
        console.log('Error fetching owner name', error);
      }
    };

    fetchOwnerName();
  }, [modifiedAlbum.owner]);
  const handleWilayaChange = (code) => {
    setSelectedCode(code); 
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '80px' }}>
      <Grid container spacing={2}>
        {mode === 'update' && (
          <Grid item xs={isMobile ? 12 : 5}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '90px',
              }}
            >
              <img
                src={modifiedAlbum.image}
                alt="album image"
                style={{
                  width: '80%',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />

              <label htmlFor="image-upload-update">
                <Input
                  accept="image/*"
                  id="image-upload-update"
                  type="file"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <Button component="span" variant="outlined">
                  {t('Change Image')}
                </Button>
              </label>
            </div>
          </Grid>
        )}

        <Grid item xs={isMobile ? 12 : 7}>
          <PrimaryColorText gutterBottom className="title">
            {t('Album Details')}
          </PrimaryColorText>
          {mode === 'update' && (
            <>
              <TextField
                name="date"
                label={t('Date')}
                fullWidth
                value={modifiedAlbum.created_at}
                margin="normal"
                disabled
              />
              <TextField
                name="owner"
                label={t('Owner')}
                fullWidth
                value={ownerName}
                margin="normal"
                disabled
              />
            </>
          )}

          {(mode === 'create' || mode === 'update') && (
            <>
              <TextField
                name="name"
                label={t('Name')}
                fullWidth
                value={modifiedAlbum.name}
                onChange={handleChange}
                margin="normal"
              />
              <Wilayas selectedCode={selectedCode} handleSelectChange={handleWilayaChange} />
              <TextField
                name="commune"
                label={t('Commune')}
                fullWidth
                value={modifiedAlbum.commune}
                onChange={handleChange}
                margin="normal"
              />
            </>
          )}

          {mode === 'create' && (
            <>
              <label
                htmlFor="image-upload"
                style={{ display: 'block', marginTop: '8px' }}
              >
                {t('Upload Image')}
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </>
          )}

          {mode === 'update' && (
            <>
              <StateMenuSelect
                currentState={modifiedAlbum.state}
                onChangeState={(newState) => handleSwitchChange(modifiedAlbum.id, newState)}
              />
              </>
              )}
              <Grid item xs={12}>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={mode === 'update' ? handleUpdate : handleCreate}
                  >
                    {mode === 'update' ? t('Save') : t('Create')}
                  </Button>
                </Box>
              </Grid>
        </Grid>
      </Grid>
      {mode === 'update' && (
        <Box mt={3}>
          <StyledTypography>{t('Aimé par')}</StyledTypography>
          <LikedByList likedByList={modifiedAlbum.liked_by} />
        </Box>
      )}
    </Paper>
  );
};

export default AlbumDetails;
