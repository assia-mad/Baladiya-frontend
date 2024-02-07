// SurveyUpdate.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SurveyDetails from './SurveyDetails';
import apiInstance from '../../../../../API';
import SuccessSnackbar from '../../../Tools/SuccessSnackBar';
import ErrorSnackbar from '../../../Tools/ErrorSnackBar';

const SurveyUpdate = () => {
  const { id } = useParams();
  const [modifiedSurvey, setModifiedSurvey] = useState({
    owner: '',
    title: '',
    description: '',
  });
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

  const fetchSurveyData = async () => {
    try {
      const response = await apiInstance.get(`surveys/${id}/`);
      setModifiedSurvey(response); 
      console.log('Response:', response);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, [id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', modifiedSurvey.title);
    formData.append('description', modifiedSurvey.description);

    try {
      const response = await apiInstance.patch(`surveys/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setModifiedSurvey(response);
      setSuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
    } catch (error) {
      console.log(error);
      setErrorMsg(t('La modification a échoué'));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedSurvey((prevSurvey) => ({
      ...prevSurvey,
      [name]: value,
    }));
  };

  return (
    <>
      <ErrorSnackbar open={isToastOpen} onClose={handleToastClose} errorMsg={errorMsg} />
      <SuccessSnackbar open={isSuccessOpen} onClose={handleToastClose} successMsg={successMsg} />
      <SurveyDetails mode="update" handleChange={handleChange} handleUpdate={handleUpdate} modifiedSurvey={modifiedSurvey} />
    </>
  );
};

export default SurveyUpdate;
