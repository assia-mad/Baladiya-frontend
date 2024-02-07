import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import MicroEntrepriseCreationStepDetails from "./MicroEntrepriseCreationStepDetails";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const MicroEntrepriseCreationStepCreate = () => {
  const [creationStep, setCreationStep] = useState({
    title: '',
    description: '',
    rang: 0,
    type:'Economique'
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
      type:'Economique'
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
      <MicroEntrepriseCreationStepDetails
        mode="create"
        handleChange={handleChange}
        handleSave={handleCreate}
        creationStepData={creationStep}
      />
    </>
  );
};

export default MicroEntrepriseCreationStepCreate;

