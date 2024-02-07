import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextField, Grid, Box, Button, Typography, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import algeriaCities from '../../../../../dzData.json';
import apiInstance from '../../../../../API';
import PrimaryColorText from '../../../Tools/Title';

const PublicityDetails = ({ modifiedPublicity, handleChange, handleUpdate, handleImageUpload }) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [communeNames, setCommuneNames] = useState([]);
  const [ownerDetails, setOwnerDetails] = useState({ name: '', phone: '' });
  const [image, setImage] = useState(modifiedPublicity.image || '');

  useEffect(() => {
    if (modifiedPublicity) {
      setStartDate(new Date(modifiedPublicity.start_date || new Date()));
      setEndDate(new Date(modifiedPublicity.end_date || new Date()));
      mapCommuneNames();
      fetchOwnerDetails();
      setImage(modifiedPublicity.image);
    }
  }, [modifiedPublicity]);

  const mapCommuneNames = () => {
    const names = modifiedPublicity.communes.communes.map(code =>
      algeriaCities.find(city => city.id === code)?.commune_name_ascii || code
    );
    setCommuneNames(names);
  };

  const fetchOwnerDetails = async () => {
    try {
      const response = await apiInstance.get(`/user/`);
      setOwnerDetails({
        name: response?.first_name + ' ' + response?.last_name,
        phone: response?.phone,
      });
    } catch (error) {
      console.error('Error fetching owner details', error);
    }
  };

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      handleImageUpload(file);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date || new Date());
  };

  const handleEndDateChange = (date) => {
    setEndDate(date || new Date());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 10, mr: 20, ml: 20 }}>
        <PrimaryColorText className="title">{t('Publicité')}</PrimaryColorText>
        <Grid container spacing={3}>
        <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
            <Box>
                <img
                src={image}
                alt="Publicity"
                style={{ maxWidth: '100%', maxHeight: '300px' }}
                />
                <input
                accept="image/*"
                id="image-upload"
                type="file"
                hidden
                onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    fullWidth
                    style={{ marginTop: '10px' }}
                >
                    {t('Change Image')}
                </Button>
                </label>
            </Box>
            </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>{t('Communes')}</InputLabel>
              <Select
                multiple
                value={[]}
                renderValue={(selected) => communeNames.join(', ')}
                MenuProps={{ PaperProps: { style: { maxHeight: 48 * 4.5 + 8, width: 250 } } }}
              >
                {communeNames.map((name) => (
                  <MenuItem key={name} value={name} disabled>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              label={t('Propriétaire')}
              fullWidth
              value={ownerDetails.name}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="normal"
              label={t('Phone')}
              fullWidth
              value={ownerDetails.phone}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="normal"
              name="title"
              label={t('Title')}
              fullWidth
              value={modifiedPublicity.title || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="description"
              label={t('Description')}
              fullWidth
              multiline
              rows={4}
              value={modifiedPublicity.description || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="link"
              label={t('Lien')}
              fullWidth
              value={modifiedPublicity.link || ''}
              onChange={handleChange}
            />
           <Grid container spacing={2}>
              <Grid item xs={6}>
                <DesktopDatePicker
                  label={t('Date début')}
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <DesktopDatePicker
                  label={t('End Date')}
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdate({ start_date: startDate, end_date: endDate })}
          >
            {t('Update')}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default PublicityDetails;
