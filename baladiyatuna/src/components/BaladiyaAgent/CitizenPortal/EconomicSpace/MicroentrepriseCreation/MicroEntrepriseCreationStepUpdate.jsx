// CreationStepUpdate.jsx
import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import MicroEntrepriseCreationStepDetails from "./MicroEntrepriseCreationStepDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";
import algeriaCities from "../../../../../../dzData.json";

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};

const MicroEntrepriseCreationStepUpdate = () => {
  const { id } = useParams();
  const [modifiedCreationStep, setModifiedCreationStep] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState(null);
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
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
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
    const formData = new FormData();

    formData.append('title', modifiedCreationStep.title);
    formData.append('description', modifiedCreationStep.description);
    formData.append('rang', modifiedCreationStep.rang);
    if (communeCode){
      formData.append('commune',parseInt(communeCode));
    };
    
    try {
      const response = await apiInstance.patch(`companies_creation/${id}/`, formData);
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
      <MicroEntrepriseCreationStepDetails
        mode="update"
        handleChange={handleChange}
        handleSave={handleUpdate}
        creationStepData={modifiedCreationStep}
        selectedCommune={selectedCommune}
        setSelectedCommune={setSelectedCommune}
        selectedCommuneName={selectedCommuneName}
        topicWilaya={wilayaCode}
        setSelectedCommuneName={setSelectedCommuneName}
        communeCode={communeCode}
        setCommuneCode={setCommuneCode}
      />
    </>
  );
};

export default MicroEntrepriseCreationStepUpdate;
