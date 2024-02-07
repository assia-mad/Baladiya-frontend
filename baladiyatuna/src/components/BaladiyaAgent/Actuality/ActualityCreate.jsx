import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../../API";
import ActualityDetails from "./AcutalityDetails";
import ErrorSnackbar from "../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../Tools/SuccessSnackBar";


const ActualityCreate = () => {
  const [actuality, setActuality] = useState({
    title: '',
    description: '',
    type: '', 
    created_at: new Date(),
    owner: null,
  });
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActuality((prevActuality) => ({
      ...prevActuality,
      [name]: value,
    }));
  };

  const handleCreate = async (selectedDate) => {
    const formData = new FormData();
    const parsedUserId = parseInt(userId, 10); 
    formData.append('owner', parsedUserId);
    formData.append('title', actuality.title);
    formData.append('description', actuality.description);
    formData.append('type', actuality.type);
    formData.append('date',selectedDate.toISOString());
    if (file) {
      formData.append('file', file);
    }
    
    try {
      const response = await apiInstance.post(`actualities/`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
          },
      });
      setSuccessOpen(true);
      setSuccessMsg(t("La creation a réussi!"))
      console.log('Response of create:', response);
    } catch (error) {
      setToastOpen(true);
      setErrorMsg(t('Creation echouée'))
      console.log('Error creation', error);
    }
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
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
      <ActualityDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        handleFileUpload={handleFileUpload}
        modifiedActuality={actuality}
      />
    </>
  );
};

export default ActualityCreate;
