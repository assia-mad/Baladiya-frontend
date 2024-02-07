import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SurveyDetails from './SurveyDetails';
import apiInstance from '../../../../../API';
import ErrorSnackbar from '../../../Tools/ErrorSnackBar';
import SuccessSnackbar from '../../../Tools/SuccessSnackBar';

const SurveyCreate = () => {
  const [survey, setSurvey] = useState({
    owner: null,
    title: '',
    description: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [userId, setUserId] = useState(null);
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

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('owner', userId);
    formData.append('title', survey.title);
    formData.append('description', survey.description);

    try {
      const response = await apiInstance.post(`surveys/`, formData, {
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
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
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
      <SurveyDetails
        mode='create'
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedSurvey={survey}
      />
    </>
  );
};

export default SurveyCreate;
