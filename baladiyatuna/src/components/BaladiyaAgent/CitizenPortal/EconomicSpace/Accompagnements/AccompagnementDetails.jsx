import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Grid, Box, Button, Typography, Input } from "@mui/material";
import StateMenuSelect from "../../../../Tools/StateMenu";
import { useMediaQuery } from "@mui/material";
import apiInstance from "../../../../../../API";

const EconomicAccompagnementDetails = ({
  mode,
  handleChange,
  handleCreate,
  handleUpdate,
  modifiedAccompagnement,
  handleImageUpload,
}) => {
  const { t } = useTranslation();
  const [ownerName, setOwnerName] = useState("");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  if (mode === "update") {
    useEffect(() => {
      const fetchOwnerName = async () => {
        try {
          const response = await apiInstance.get(
            `/manage_users/${modifiedAccompagnement.owner}/`
          );
          setOwnerName(
            response?.first_name + " " + response?.last_name
          );
        } catch (error) {
          console.log("Error fetching owner name", error);
        }
      };

      fetchOwnerName();
    }, [modifiedAccompagnement.owner]);
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
                src={modifiedAccompagnement.image}
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
        <Grid item xs={isMobile || mode === "create" ? 12 : 7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className="title">{t("Accompagnement")}</Typography>
            </Grid>
            {mode === "update" && (
              <>
                <Grid item xs={6}>
                  <TextField
                    name="date"
                    label={t("date")}
                    fullWidth
                    value={modifiedAccompagnement.created_at}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="owner"
                    label={t("Propriétaire")}
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
                label={t("Titre")}
                fullWidth
                value={modifiedAccompagnement.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t("Description")}
                multiline
                fullWidth
                value={modifiedAccompagnement.description}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={mode === "update" ? handleUpdate : handleCreate}
                >
                  {mode === "update" ? t("save") : t("Créer")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EconomicAccompagnementDetails;
