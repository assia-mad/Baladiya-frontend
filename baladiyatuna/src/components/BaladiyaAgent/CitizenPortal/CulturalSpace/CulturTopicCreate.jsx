import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CulturTopicDetails from "./CulturTopicDetails";
import apiInstance from "../../../../../API";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";


const CulturTopicCreate = () => {
  const [topic, setTopic] = useState({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState('');
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState(null);
  const [currentUserCommune, setCurrentUSerCommune] = useState(false);
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

  const getCurrentUser= async () => {
    try {
      const response = await apiInstance.get(`user/`);
      setUserId(response.id);
      setCurrentUSerCommune(response.id);
    } catch (error) {
      console.log(error);
      setErrorMsg(t('Echec de trouver owner ID'));
      setToastOpen(true);
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    const parsedUserId = parseInt(userId, 10);
    formData.append('owner', parsedUserId);
    formData.append('title', topic.title);
    formData.append('description', topic.description);
    const parsedCommune = communeCode ? parseInt(communeCode, 10): parseInt(currentUserCommune,10);
    formData.append('commune',parsedCommune);
    formData.append('type','Culturel');

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await apiInstance.post(`topics/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      setSuccessOpen(true);
      setsuccessMsg(t('La creation a réussi!'));
    } catch (error) {
      console.log(error);
      setErrorMsg(t('Creation echouée'));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopic((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
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
      <CulturTopicDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        handleImageUpload={handleImageUpload}
        modifiedTopic={topic}
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

export default CulturTopicCreate;
