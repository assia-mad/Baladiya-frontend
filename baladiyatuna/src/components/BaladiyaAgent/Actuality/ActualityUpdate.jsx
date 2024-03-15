import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import apiInstance from "../../../../API";
import ActualityDetails from "./AcutalityDetails"; 
import SuccessSnackbar from "../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../Tools/ErrorSnackBar";
import algeriaCities from "../../../../dzData.json";

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};

const ActualityUpdate = () => {
  const { id } = useParams();
  const [modifiedActuality, setModifiedActuality] = useState(null);
  const [file, setFile] = useState(null);
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
    const fetchActualityData = async () => {
      try {
        const response = await apiInstance.get(`actualities/${id}/`);
        setModifiedActuality(response);
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
      } catch (error) {
        console.log('Error fetching actuality data', error);
      }
    };

    fetchActualityData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedActuality((prevActuality) => ({
      ...prevActuality,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`actualities/${id}/`, { state });
      setModifiedActuality((prevActuality) => ({
        ...prevActuality,
        state: response?.state,
      }));
    } catch (error) {
      console.log('Error updating actuality state', error);
    }
  };

  const handleUpdate = async (selectedDate) => {
    const formData = new FormData();
    formData.append('title', modifiedActuality.title);
    formData.append('description', modifiedActuality.description);
    formData.append('type', modifiedActuality.type);
    formData.append('date',selectedDate.toISOString());
    if (file){
        formData.append('file', file);
    };
    if (communeCode){
      formData.append('commune',parseInt(communeCode));
    };

    try {
      const response = await apiInstance.patch(`actualities/${modifiedActuality.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModifiedActuality(response);
      setSuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
      console.log('Response after update:', response);
    } catch (error) {
      console.log('Error updating actuality', error);
      setErrorMsg(t('La modification a échoué'));
      setToastOpen(true);
    }
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  if (!modifiedActuality) {
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
      <ActualityDetails
        mode="update"
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleUpdate={handleUpdate}
        modifiedActuality={modifiedActuality}
        handleFileUpload={handleFileUpload}
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

export default ActualityUpdate;
