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
import apiInstance from '../../../../../API';
import LikedByList from '../../../Tools/Likes';
import StateMenuSelect from '../../../Tools/StateMenu';
import Wilayas from '../../../Tools/Wilayas';
import Communes from '../../../Tools/Communes';
import PrimaryColorText from '../../../Tools/Title';
import ReusableButton from '../../../Tools/SaveButton';


const VisitDetails = ({
  mode,
  modifiedVisit,
  handleChange,
  handleCreate,
  handleUpdate,
  handleImageUpload,
  handleSwitchChange,
  selectedCommune,
  setSelectedCommune,
  visitWilaya,
  setCommuneCode,
  communeCode,
  setSelectedCommuneName,
}) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState('');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [wilayaCode, setWilayaCode] = useState(null);

  const fetchOwnerName = async () => {
    try {
      const response = await apiInstance.get(`/manage_users/${modifiedVisit.owner}/`);
      setOwnerName(response?.first_name + ' ' + response?.last_name);
    } catch (error) {
    console.log('Error fetching owner name', error);
  }
};
  
{mode === "update" &&
  useEffect(() => {
    fetchOwnerName();
  }, [modifiedVisit.owner]);
}
const handleSelectWilaya = (wilayaCode) => {
  setWilayaCode(wilayaCode);
  setSelectedCommune(null); 
};

const handleSelectCommune = (id, name) => {
  setCommuneCode(id);
  setSelectedCommuneName(name);
  console.log("the selected commune is", id);
};


  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '80px'}}>
      <Grid container spacing={2}>
        {mode === 'update' && (
          <Grid item xs={isMobile ? 12 : 5}>
            <div
              style={{
                flexDirection: 'column',
                marginTop: '110px',
                width: '80%', 
                height: '80%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft:'10%'
              }} >
              <img
                src={modifiedVisit.image}
                alt="visit image"
                style={{
                  width: '80%',
                  height: '90%',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  display:'flex',
                  marginTop: '5%'
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
            <PrimaryColorText variant="h6" gutterBottom className="title">
                {t('Visit Details')}
              </PrimaryColorText>
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
          {['title', 'description'].map((field) => (
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
          <Box mt={2}>
            <Wilayas handleSelectWilaya={handleSelectWilaya} selectedCode={wilayaCode ? wilayaCode:visitWilaya} />
            <Box mt={2}>
            <Communes selectedWilayaCode={wilayaCode ? wilayaCode:visitWilaya} selectedCommune={communeCode? communeCode:selectedCommune} onSelectCommune={handleSelectCommune}/>
            </Box>
              <TextField
                name="localisation"
                label={t("Localisation")}
                fullWidth
                value={modifiedVisit["localisation"]}
                margin="normal"
                onChange={handleChange}
              />
          </Box>
          {mode === "update" && (
              <Grid item xs={12}>
                <StateMenuSelect currentState={modifiedVisit.state} onChangeState={(newState) => handleSwitchChange(modifiedVisit.id, newState)} />
              </Grid>
            )}
        </Grid>


        {mode === 'create' && (
          <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <label htmlFor="image-upload" style={{ marginTop: '8px' }}>
              {t('Upload Image')}
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </Grid>
        
        )}


        <Grid item xs={12}>
          <Box mt={2} display="flex" justifyContent="center">
            <ReusableButton
              size="large"
              onClick={mode === 'update' ? handleUpdate : handleCreate}
              label={mode === 'update' ? t('Save') : t('Create')}
            />
          </Box>
        </Grid>
      </Grid>

      {mode === 'update' && (
        <Box mt={3} ml={10}>
          <PrimaryColorText style={{
            fontSize: '26px',
            fontFamily: 'sans-serif',
            fontWeight: '900',
            lineHeight: '34px'
          }}>{t('Aimé par')}</PrimaryColorText>
          <LikedByList likedByList={modifiedVisit.liked_by} />
        </Box>
      )}

    </Paper>
  );
};

export default VisitDetails;
