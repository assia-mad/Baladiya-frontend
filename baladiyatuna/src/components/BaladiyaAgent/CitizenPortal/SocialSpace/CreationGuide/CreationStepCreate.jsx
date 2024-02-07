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
    setCreationStep((prevCreationStep) => ({
      ...prevCreationStep,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const data = {
      title: creationStep.title,
      description: creationStep.description,
      rang: creationStep.rang,
      owner: userId,
      type:'Social'
    };

    try {
      const response = await apiInstance.post(`companies_creation/`, data);
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
      />
    </>
  );
};

export default CreationStepCreate;

