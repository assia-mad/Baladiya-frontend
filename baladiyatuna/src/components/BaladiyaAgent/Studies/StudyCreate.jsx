import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StudyDetails from './StudyDetails';
import apiInstance from '../../../../API';
import ErrorSnackbar from '../../Tools/ErrorSnackBar';
import SuccessSnackbar from '../../Tools/SuccessSnackBar';

const StudyCreate = () => {
  const [study, setStudy] = useState({
    owner: '',
    title: '',
    description: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [userId, setUserId] = useState(null);
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

  const handleCreate = async (selectedDate) => {
    const formData = new FormData();
    formData.append('owner', userId);
    formData.append('title', study.title);
    formData.append('description', study.description);
    const formattedDate = selectedDate.toISOString().split('T')[0]; 
    formData.append('date', formattedDate);
    const parsedCommune = communeCode ? parseInt(communeCode, 10): parseInt(currentUserCommune,10);
    formData.append('commune',parsedCommune);

    try {
      const response = await apiInstance.post(`studies/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      setSuccessMsg(t('La création a réussi!'));
      setSuccessOpen(true);
      
    } catch (error) {
      console.log(error);
      setErrorMsg(t('Création échouée'));
      setToastOpen(true);
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudy((prevStudy) => ({
      ...prevStudy,
      [name]: value,
    }));
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
    <StudyDetails
      mode='create'
      handleChange={handleChange}
      handleCreate={handleCreate}
      modifiedStudy={study}
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

export default StudyCreate;
