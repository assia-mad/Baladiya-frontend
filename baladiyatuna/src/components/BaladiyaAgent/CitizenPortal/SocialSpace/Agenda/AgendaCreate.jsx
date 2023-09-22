import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import AgendaDetails from "./AgendaDetails"; 
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const AgendaCreate = () => {
  const [agenda, setAgenda] = useState({
    title: '',
    description: '',
    date: new Date(),
    localisation: '',
    owner: null
  });
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState('');
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
    setAgenda((prevAgenda) => ({
      ...prevAgenda,
      [name]: value,
    }));
  };

  const handleCreate = async (selectedDate) => {
    const formData = new FormData();
    const parsedUserId = parseInt(userId, 10); 
    formData.append('owner', parsedUserId);
    formData.append('title', agenda.title);
    formData.append('description', agenda.description);
    formData.append('localisation',agenda.localisation);
    formData.append('date',selectedDate.toISOString())
   
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    try {
      const response = await apiInstance.post(`agendas/`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
          },
      });
      setSuccessOpen(true);
      setsuccessMsg(t("La creation a réussi!"))
      console.log('Response of create:', response);
    } catch (error) {
      setToastOpen(true);
      setErrorMsg(t('Creation echouée'))
      console.log('Error creation', error);
    }
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
      <AgendaDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        handleImageUpload={handleImageUpload}
        modifiedAgenda={agenda}
      />
    </>
  );
};

export default AgendaCreate;
