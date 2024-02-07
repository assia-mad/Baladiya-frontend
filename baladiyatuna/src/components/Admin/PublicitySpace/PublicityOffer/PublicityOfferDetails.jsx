import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Button } from '@mui/material';
import Communes from '../../../Tools/Communes';
import Wilayas from '../../../Tools/Wilayas';
import PrimaryColorText from '../../../Tools/Title';

const PublicityOfferDetails = ({
    mode,
    handleChange,
    handleCreate,
    handleUpdate,
    modifiedOffer,
    handleSelectWilaya,
    handleSelectCommune,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (mode === 'update' && modifiedOffer) {
      modifiedOffer.population = modifiedOffer.population ?? '';
      modifiedOffer.price = modifiedOffer.price ?? '';
    }
  }, [mode, modifiedOffer]);

  return (
    <Box sx={{ mt: 15, mr: 20, ml: 20 }}>
      <PrimaryColorText className='title'>
        {t('Offre de Publicité')}
      </PrimaryColorText>
      <Grid container spacing={2}>
        {mode === "update" && (
          <Grid item xs={12}>
            <TextField
              name="created_at"
              label={t('Date')}
              fullWidth
              value={modifiedOffer.created_at}
              InputLabelProps={{ shrink: true }} 
              disabled
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <Wilayas 
            handleSelectWilaya={handleSelectWilaya} 
            selectedCode={modifiedOffer.wilaya} 
          />
        </Grid>
        <Grid item xs={6}>
          <Communes 
            selectedWilayaCode={modifiedOffer.wilaya} 
            selectedCommune={modifiedOffer.commune} 
            onSelectCommune={handleSelectCommune}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="population"
            label={t('Population')}
            fullWidth
            value={modifiedOffer.population}
            onChange={handleChange} 
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="price"
            label={t('Price')}
            fullWidth
            value={modifiedOffer.price}
            onChange={handleChange}  
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => mode === "update" ? handleUpdate() : handleCreate()}
            >
              {mode === 'update' ? t('Modifier') : t('Créer')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicityOfferDetails;
