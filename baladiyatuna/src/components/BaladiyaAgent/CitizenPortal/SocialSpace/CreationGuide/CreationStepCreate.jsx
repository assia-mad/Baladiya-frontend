import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import CreationStepDetails from "./CreationStepDetails"; 
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const CreationStepCreate = () => {
  const [creationStep, setCreationStep] = useState({
    title: '',
    description: '',
    rang: 0,
    type:'Social'
  });
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState(null);
  const [currentUserCommune, setCurrentUSerCommune] = useState(null);
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
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await apiInstance.get(`user/`);
      setUserId(response.id);
      setCurrentUSerCommune(response.commune);
    } catch (error) {
      console.log(error);
      setErrorMsg(t('Echec de trouver owner ID'));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreationStep((prevCreationStep) => ({
      ...prevCreationStep,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const formData = new FormData();

    formData.append('title', creationStep.title);
    formData.append('description', creationStep.description);
    formData.append('rang', creationStep.rang);
    formData.append('owner', userId);
    formData.append('type', 'Social');
    const parsedCommune = communeCode ? parseInt(communeCode, 10): parseInt(currentUserCommune,10);
    formData.append('commune',parsedCommune);

    try {
      const response = await apiInstance.post(`companies_creation/`, formData);
      setSuccessOpen(true);
      setSuccessMsg(t("La création a réussi!"));
      console.log('Response of create:', response);
    } catch (error) {
      setToastOpen(true);
      setErrorMsg(t('Création échouée'));
      console.log('Error creation', error);
    }
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
      <CreationStepDetails
        mode="create"
        handleChange={handleChange}
        handleSave={handleCreate}
        creationStepData={creationStep}
        selectedCommune={selectedCommune}
        setSelectedCommune={setSelectedCommune}
        setSelectedCommuneName={setSelectedCommuneName}
        topicWilaya={wilayaCode}
        communeCode={communeCode}
        setCommuneCode={setCommuneCode}
      />
    </>
  );
};

export default CreationStepCreate;

