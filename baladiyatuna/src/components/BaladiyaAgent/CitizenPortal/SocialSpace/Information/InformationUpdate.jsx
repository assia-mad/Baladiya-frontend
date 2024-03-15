import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import InformationDetails from "./InformationDetails";
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

const InformationUpdate = () => {
  const { id } = useParams();
  const [modifiedInformation, setModifiedInformation] = useState(null);
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
    if (isToastOpen) {
      setToastOpen(false);
    } else {
      setSuccessOpen(false);
    }
  };

  useEffect(() => {
    const fetchInformationData = async () => {
      try {
        const response = await apiInstance.get(`social_informations/${id}/`);
        setModifiedInformation(response);
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
      } catch (error) {
        console.log('Error fetching information data', error);
      }
    };

    fetchInformationData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedInformation((prevInformation) => ({
      ...prevInformation,
      [name]: value,
    }));
  };
  
  const handleUpdate = async () => {
    const data = {
      title: modifiedInformation.title,
      description: modifiedInformation.description,
    };

    try {
      const response = await apiInstance.patch(`social_informations/${modifiedInformation.id}/`, data);
      setModifiedInformation(response);
      setSuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
      console.log('Response after update:', response);
    } catch (error) {
      console.log('Error updating information', error);
      setErrorMsg(t('modification echouée'));
      setToastOpen(true);
    }
  };

  if (!modifiedInformation) {
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
      <InformationDetails
        mode="update"
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        modifiedInformation={modifiedInformation}
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

export default InformationUpdate;
