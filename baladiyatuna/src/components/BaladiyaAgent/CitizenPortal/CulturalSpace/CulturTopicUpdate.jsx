import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import apiInstance from "../../../../../API";
import CulturTopicDetails from "./CulturTopicDetails";
import algeriaCities from "../../../../../dzData.json";

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};


const CulturalTopicUpdate = () => {
  const { id } = useParams();
  const [modifiedTopic, setModifiedTopic] = useState(null);
  const [imageFile, setImageFile] = useState(null);
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
    const fetchTopicData = async () => {
      try {
        const response = await apiInstance.get(`topics/${id}/`);
        setModifiedTopic(response);
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchTopicData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedTopic((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`topics/${id}/`, { state });
      setModifiedTopic((prevTopic) => ({
        ...prevTopic,
        state: newState,
      }));
      console.log('Switch Change Response:', response);
    } catch (error) {
      console.log('Switch Change Error:', error);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', modifiedTopic.title);
    formData.append('description', modifiedTopic.description);
    if (imageFile) {
      formData.append('image', imageFile);
    };
    if (communeCode){
      formData.append('commune',parseInt(communeCode));
    };

    try {
      const response = await apiInstance.patch(`topics/${modifiedTopic.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModifiedTopic(response);
      setSuccessMsg(t('Topic modifié avec succès'));
      setSuccessOpen(true);
      console.log('Update Response:', response);
    } catch (error) {
      console.log('Update Error:', error);
      setErrorMsg(t('Modification échouée'));
      setToastOpen(true);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  if (!modifiedTopic) {
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
      <CulturTopicDetails
        mode="update"
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleUpdate={handleUpdate}
        modifiedTopic={modifiedTopic}
        handleImageUpload={handleImageUpload}
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

export default CulturalTopicUpdate;
