import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Button, Typography, Input } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import 'react-datetime-picker/dist/DateTimePicker.css';
import StateMenuSelect from '../../../Tools/StateMenu';
import apiInstance from '../../../../../API';


const ProductDetails = ({ mode, handleChange, handleSwitchChange, handleCreate, handleUpdate, modifiedProduct, handleImageUpload }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [ownerName, setOwnerName] = useState('');

  if (mode === "update") {
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const response = await apiInstance.get(`/manage_users/${modifiedProduct.owner}/`);
          setOwnerName(response?.first_name + ' ' + response?.last_name);
        } catch (error) {
          console.log('Error fetching owner name', error);
        }
      };

      fetchOwnerName();
    }, [modifiedProduct.owner]);
  }

  return (
       <Box m={15} ml={mode === "update" ? 15 : 30} mr={mode === "update" ? 15 : 30}>
      <Grid container spacing={1} alignItems="center" direction={isMobile ? 'column' : 'row'}>
        {mode === "update" && (
          <Grid item xs={isMobile ? 12 : 5}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '20px' }}>
              <img
                src={modifiedProduct.image}
                alt="Product image"
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
        <Grid item xs={(isMobile || mode === "create") ? 12 : 7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className='title'>
                {t('Product')}
              </Typography>
            </Grid>
            {mode === "update" && (
              <Grid item xs={6}>
                <TextField
                  name="created_at"
                  label={t('Created At')}
                  fullWidth
                  value={modifiedProduct.created_at}
                  disabled
                />
              </Grid>
            )}
            {mode === "update" && (
              <Grid item xs={6}>
                <TextField
                  name="owner"
                  label={t('Owner')}
                  fullWidth
                  value={ownerName}
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                name="name"
                label={t('Name')}
                fullWidth
                value={modifiedProduct.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('Description')}
                multiline
                fullWidth
                value={modifiedProduct.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                label={t('Price')}
                fullWidth
                value={modifiedProduct.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="action_type"
                label={t('Action Type')}
                fullWidth
                value={modifiedProduct.action_type}
                onChange={handleChange}
              />
            </Grid>
            {mode === "create" && (
              <Grid item xs={12}>
                <label
                  htmlFor="image-upload"
                  style={{ display: "block", marginTop: "8px" }}
                >
                  {t("Upload Image")}
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
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={mode === "update" ? handleUpdate : handleCreate }>
                  {mode === 'update' ? t('Save') : t('Create')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
