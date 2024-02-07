// CreationStepUpdate.jsx
import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import CreationStepDetails from "./CreationStepDetails"; 
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";

const CreationStepUpdate = () => {
  const { id } = useParams();
  const [modifiedCreationStep, setModifiedCreationStep] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
    setSuccessOpen(false);
  };

  useEffect(() => {
    const fetchCreationStepData = async () => {
      try {
        const response = await apiInstance.get(`companies_creation/${id}/`);
        setModifiedCreationStep(response);
      } catch (error) {
        setErrorMsg(t('Failed to fetch creation step data'));
        setToastOpen(true);
        console.error('Error fetching creation step data', error);
      }
    };

    fetchCreationStepData();
  }, [id, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedCreationStep((prevStep) => ({
      ...prevStep,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await apiInstance.patch(`companies_creation/${id}/`, modifiedCreationStep);
      setSuccessMsg(t('Creation step updated successfully!'));
      setSuccessOpen(true);
      console.log('Response after update:', response);
    } catch (error) {
      setErrorMsg(t('Failed to update creation step'));
      setToastOpen(true);
      console.error('Error updating creation step', error);
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
        mode="update"
        handleChange={handleChange}
        handleSave={handleUpdate}
        creationStepData={modifiedCreationStep}
      />
    </>
  );
};

export default CreationStepUpdate;
