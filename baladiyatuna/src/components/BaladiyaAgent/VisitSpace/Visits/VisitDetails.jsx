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
import StateMenuSelect from '../../../Tools/StateMenu';

const StyledTypography = styled(Typography)`
  font-size: 26px;
  font-family: sans-serif;
  font-weight: 900;
  line-height: 34px;
`;

const VisitDetails = ({
  mode,
  modifiedVisit,
  handleChange,
  handleCreate,
  handleUpdate,
  handleImageUpload,
  handleSwitchChange
}) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchOwnerName = async () => {
      try {
        const response = await apiInstance.get(`/manage_users/${modifiedVisit.owner}/`);
        setOwnerName(response?.first_name + ' ' + response?.last_name);
      } catch (error) {
        console.log('Error fetching owner name', error);
      }
    };

    fetchOwnerName();
  }, [modifiedVisit.owner]);

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
                marginTop: '110px',
              }}
            >
              <img
                src={modifiedVisit.image}
                alt="visit image"
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
          <Typography variant="h6" gutterBottom className="title">
            {t('Visit Details')}
          </Typography>
          {mode === 'update' && (
            <>
              <TextField
                name="date"
                label={t('Date')}
                fullWidth
                value={modifiedVisit.created_at}
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

          {['title', 'description', 'localisation', 'commune'].map((field) => (
            <TextField
              key={field}
              name={field}
              label={t(field.charAt(0).toUpperCase() + field.slice(1))}
              fullWidth
              value={modifiedVisit[field]}
              margin="normal"
              onChange={handleChange}
            />
          ))}
          {mode === "update" && (
              <Grid item xs={12}>
                <StateMenuSelect currentState={modifiedVisit.state} onChangeState={(newState) => handleSwitchChange(modifiedVisit.id, newState)} />
              </Grid>
            )}
        </Grid>


        {mode === 'create' && (
          <Grid item xs={12}>
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
          </Grid>
        )}

        <Grid item xs={12}>
          <Box mt={2} display="flex" justifyContent="center">
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

      {mode === 'update' && (
        <Box mt={3}>
          <StyledTypography>{t('Aimé par')}</StyledTypography>
          <LikedByList likedByList={modifiedVisit.liked_by} />
        </Box>
      )}
    </Paper>
  );
};

export default VisitDetails;
