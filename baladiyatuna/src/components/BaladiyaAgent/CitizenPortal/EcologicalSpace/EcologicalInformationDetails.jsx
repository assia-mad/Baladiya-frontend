import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Grid,
  Box,
  Button,
  Typography,
  Input,
  FormControl,
  MenuItem,
  Select,
  FormControlLabel,
  Switch,
  InputLabel
} from "@mui/material";
import StateMenuSelect from "../../../Tools/StateMenu";
import { useMediaQuery } from "@mui/material";
import apiInstance from "../../../../../API";


const EcologicalInformationDetails = ({
  mode,
  handleChange,
  handleCreate,
  handleUpdate,
  modifiedEcologicalInformation,
  handleImageUpload,
  handleSwitchChange,
}) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState("");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  if (mode === "update") {
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const response = await apiInstance.get(
            `/manage_users/${modifiedEcologicalInformation.owner}/`
          );
          setOwnerName(response?.first_name + " " + response?.last_name);
        } catch (error) {
          console.log("Error fetching owner name", error);
        }
      };

      fetchOwnerName();
    }, [modifiedEcologicalInformation.owner]);
  }

  return (
    <Box m={15} ml={mode === "update" ? 15 : 30} mr={mode === "update" ? 15 : 30}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        direction={isMobile ? "column" : "row"}
      >
        {mode === "update" && (
          <Grid item xs={isMobile ? 12 : 5}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <img
                src={modifiedEcologicalInformation.image}
                alt="ecological information image"
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
        <Grid item xs={isMobile || mode === "create" ? 12 : 7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className="title">
                {t("Information Ecologique")}
              </Typography>
            </Grid>
            {mode === "update" && (
              <>
                <Grid item xs={6}>
                  <TextField
                    name="date"
                    label={t("Date")}
                    fullWidth
                    value={modifiedEcologicalInformation.created_at}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="owner"
                    label={t("Owner")}
                    fullWidth
                    value={ownerName}
                    disabled
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                name="title"
                label={t("Title")}
                fullWidth
                value={modifiedEcologicalInformation.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t("Description")}
                multiline
                fullWidth
                value={modifiedEcologicalInformation.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>{t("Type")}</InputLabel>
                    <Select
                    name="type"
                    value={modifiedEcologicalInformation.type}
                    onChange={handleChange}
                    >
                    <MenuItem value="valorisation">{t("Valorisation")}</MenuItem>
                    <MenuItem value="sensibilisation">{t("Sensibilisation")}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {mode === "update" &&            
            <Grid item xs={6}>
            <StateMenuSelect currentState={modifiedEcologicalInformation.state} onChangeState={(newState) => handleSwitchChange(modifiedFormation.id, newState)} />
            </Grid>
            }
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={mode === "update" ? handleUpdate : handleCreate}
                >
                  {mode === "update" ? t("Save") : t("Create")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EcologicalInformationDetails;
