import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EconomicFormationDetails from "./FormationDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import apiInstance from "../../../../../../API";
import algeriaCities from "../../../../../../dzData.json";

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};

const EconomicFormationUpdate= () => {
  const { id } = useParams();
  const [modifiedFormation, setModifiedFormation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState('');
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState(null);
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
    const fetchFormationData = async () => {
      try {
        const response = await apiInstance.get(`formations/${id}/`);
        setModifiedFormation(response); 
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
      } catch (error) {
        console.log('Error fetching formation data', error);
      }
    };

    fetchFormationData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedFormation((prevFormation) => ({
      ...prevFormation,
      [name]: value,
    }));
  };

  const handleUpdate = async (selectedDate) => {

    const formData = new FormData();

    formData.append('title', modifiedFormation.title);
    formData.append('description', modifiedFormation.description);
    formData.append('date', selectedDate.toISOString());
    formData.append('localisation', modifiedFormation.localisation);
    if (communeCode){
      formData.append('commune',parseInt(communeCode));
    };
    
    try {
      const response = await apiInstance.patch(`formations/${modifiedFormation.id}/`, formData);
      setModifiedFormation(response);
      setsuccessMsg(t('formation modifiée avec succés!'));
      setSuccessOpen(true);
      console.log('Response after update:', response);
    } catch (error) {
      console.log('Error updating formation', error);
      setErrorMsg(t('modification echoué'));
      setToastOpen(true);
    }
  };

  if (!modifiedFormation) {
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
    <EconomicFormationDetails
      mode="update"
      handleChange={handleChange}
      handleUpdate={handleUpdate}
      modifiedFormation={modifiedFormation}
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

export default EconomicFormationUpdate;
