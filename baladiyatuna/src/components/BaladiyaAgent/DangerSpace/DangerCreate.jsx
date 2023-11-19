import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DangerDetails from "./DangerDetails";
import apiInstance from "../../../../API";
import ErrorSnackbar from "../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../Tools/SuccessSnackBar";

const DangerCreate = () => {
  const [danger, setDanger] = useState({
    title: "",
    description: "",
    type: "", 
  });
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedType, setSelectedType] = useState('');
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

  useEffect(() => {
    getCurrentUserId();
  }, []);

  const getCurrentUserId = async () => {
    try {
      const response = await apiInstance.get(`user/`);
      setUserId(response.id);
    } catch (error) {
      console.log(error);
      setErrorMsg(t('Echec de trouver owner ID'));
      setToastOpen(true);
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    const parsedUserId = parseInt(userId, 10);
    formData.append('owner', parsedUserId);
    formData.append('title', danger.title);
    formData.append('description', danger.description);
    formData.append('type', selectedType);
  
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      const response = await apiInstance.post(`danger_informations/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response);
      setSuccessOpen(true);
      setSuccessMsg(t('La création a réussi!'));
    } catch (error) {
      console.log(error);
      setErrorMsg(t('Création échouée'));
      setToastOpen(true);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDanger((prevDanger) => ({
      ...prevDanger,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

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
      <DangerDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        handleImageUpload={handleImageUpload}
        modifiedDanger={danger}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
    </>
  );
};

export default DangerCreate;
