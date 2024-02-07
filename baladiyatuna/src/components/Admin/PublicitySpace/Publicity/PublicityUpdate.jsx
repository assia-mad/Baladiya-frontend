import React, { useState, useEffect } from "react";
import PublicityDetails from "./PublicityDetails"; 
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../../../API";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";

const PublicityUpdate = () => {
  const { id } = useParams();
  const [modifiedPublicity, setModifiedPublicity] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
    setSuccessOpen(false);
  };

  const fetchPublicityData = async () => {
    try {
      const response = await apiInstance.get(`publicities/${id}/`);
      setModifiedPublicity(response);
    } catch (error) {
      console.log('Error:', error);
      setErrorMsg(t("Erreur"));
      setToastOpen(true);
    }
  };

  useEffect(() => {
    fetchPublicityData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedPublicity((prevPublicity) => ({
      ...prevPublicity,
      [name]: value,
    }));
  };

  const handleUpdate = async (dates) => {
    const formData = new FormData();
    
    formData.append('link',modifiedPublicity.link);
    if(dates.start_date){
        formData.append("start_date",dates.start_date.toISOString().split('T')[0]);
    };
    if(dates.end_date){
        formData.append("end_date",dates.end_date.toISOString().split('T')[0]);
    };

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await apiInstance.patch(
        `publicities/${modifiedPublicity.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setModifiedPublicity(response);
      setSuccessMsg(t("La modification a réussi!"));
      setSuccessOpen(true);
    } catch (error) {
      console.log('Update Error:', error);
      setErrorMsg(t("Modification échouée"));
      setToastOpen(true);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
  };

  if (!modifiedPublicity) {
    return <div>{t("Loading...")}</div>;
  }

  return (
    <>
      <ErrorSnackbar
        open={isToastOpen}
        onClose={handleToastClose}
        errorMsg={errorMsg}
      />
      <SuccessSnackbar
        open={isSuccessOpen}
        onClose={handleToastClose}
        successMsg={successMsg}
      />
      <PublicityDetails
        modifiedPublicity={modifiedPublicity}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleImageUpload={handleImageUpload}
      />
    </>
  );
};

export default PublicityUpdate;
