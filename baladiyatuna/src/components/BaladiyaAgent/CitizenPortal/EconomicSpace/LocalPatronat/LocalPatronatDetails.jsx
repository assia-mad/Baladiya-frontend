import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, Box, Typography, Paper, Button, Input} from '@mui/material';
import apiInstance from '../../../../../../API';
import { useMediaQuery } from '@mui/material';
import Comment from '../../../../Comments/Comment';
import PrimaryColorText from "../../../../Tools/Title";
import Wilayas from "../../../../Tools/Wilayas";
import Communes from "../../../../Tools/Communes";

const LocalPartonatDetails = ({
  mode,
  modifiedLocalPartonat,
  comments,
  handleChange,
  handleCreate,
  handleUpdate, 
  handleImageUpload,
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
 
  useEffect(() => {
    if (mode === "update") {
    fetchOwnerName();
    };
    fetchCurrentUser();
  }, [modifiedLocalPartonat.owner]);


const fetchOwnerName = async () => {
  try {
    const response = await apiInstance.get(
      `/manage_users/${modifiedLocalPartonat.owner}/`
    );
    setOwnerName(
      response?.first_name + " " + response?.last_name
    );
  } catch (error) {
    console.log("Error fetching owner name", error);
  }
};

const fetchCurrentUser = async () => {
  try{
    const response = await apiInstance.get(`user/`);
    setIsAdmin(response.role==='Admin');
  } catch(error){

  }
};
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
      {mode === "update" && (
        <Grid item xs={isMobile ? 12 : 5}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '10px' }}>
          <img
                src={modifiedLocalPartonat.image}
                alt="topic image"
                style={{
                  width: "80%",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              <label htmlFor="image-upload-update">
                <Input
                  accept="image/*"
                  id="image-upload-update"
                  type="file"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <Button component="span" variant="outlined">
                  {t("Change Image")}
                </Button>
              </label>
          </div>
        </Grid>
        )}
        <Grid item xs={isMobile ? 12 : 7}>
          <PrimaryColorText className='title'>
            {t('Local Partonat Details')}
          </PrimaryColorText>
        { mode === "update" && (
            <>
          <TextField
            name="date"
            label={t('date')}
            fullWidth
            value={modifiedLocalPartonat.created_at}
            margin="normal"
            disabled
          />
          <TextField
            name="owner"
            label={t('Propriétaire')}
            fullWidth
            value={ownerName}
            margin="normal"
            disabled
          />
           </>)}
           {isAdmin && (
              <>
              
                <Wilayas handleSelectWilaya={handleSelectWilaya} selectedCode={wilayaCode ? wilayaCode : topicWilaya} />
                <Box mt={2}>
                <Communes selectedWilayaCode={wilayaCode ? wilayaCode : topicWilaya} selectedCommune={communeCode ? communeCode : selectedCommune} onSelectCommune={handleSelectCommune} />
                </Box>
            </>
            )}
          <TextField
            name="title"
            label={t('Titre')}
            fullWidth
            value={modifiedLocalPartonat.title}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="description"
            label={t('Description')}
            multiline
            fullWidth
            value={modifiedLocalPartonat.description}
            margin="normal"
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
              <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={mode === "update" ? handleUpdate : handleCreate}>
                  {mode === 'update' ? t('save') : t('Créer')}
                </Button>
              </Box>
            </Grid>
      </Grid>
      { mode === "update" &&
      <Box mt={3}>
        <Typography variant="h6" gutterBottom className='title'>
          Comments
        </Typography>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </Box>
      }
    </Paper>
  );
};

export default LocalPartonatDetails;
