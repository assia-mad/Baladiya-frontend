import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../API";
import EcologicalInformationDetails from "./EcologicalInformationDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";

const EcologicalInformationUpdate = () => {
  const { id } = useParams();
  const [modifiedEcologicalInformation, setModifiedEcologicalInformation] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (isToastOpen) {
      setToastOpen(false);
    } else {
      setSuccessOpen(false);
    }
  };

  const fetchEcologicalInformationData = async () => {
    try {
      const response = await apiInstance.get(`ecological_informations/${id}/`);
      setModifiedEcologicalInformation(response);
      console.log('Response:', response);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchEcologicalInformationData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedEcologicalInformation((prevEcologicalInformation) => ({
      ...prevEcologicalInformation,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', modifiedEcologicalInformation.title);
    formData.append('description', modifiedEcologicalInformation.description);
    formData.append('type', modifiedEcologicalInformation.type);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    console.log('FormData:', formData);

    try {
      const response = await apiInstance.patch(`ecological_informations/${modifiedEcologicalInformation.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModifiedEcologicalInformation(response);
      setSuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
      console.log('Update Response:', response);
    } catch (error) {
      console.log('Update Error:', error);
      setErrorMsg(t('La modification a echouée'));
      setToastOpen(true);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  if (!modifiedEcologicalInformation) {
    return <div>Loading...</div>;
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
      <EcologicalInformationDetails
        mode="update"
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        modifiedEcologicalInformation={modifiedEcologicalInformation}
        handleImageUpload={handleImageUpload}
      />
    </>
  );
};

export default EcologicalInformationUpdate;
