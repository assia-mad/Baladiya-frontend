import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import StudyDetails from './StudyDetails';
import apiInstance from '../../../../API';
import SuccessSnackbar from '../../Tools/SuccessSnackBar';
import ErrorSnackbar from '../../Tools/ErrorSnackBar';

const StudyUpdate = () => {
  const { id } = useParams();
  const [modifiedStudy, setModifiedStudy] = useState({
    owner: null,
    title: '',
    description: '',
    created_at:'',
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

  const fetchDangerData = async () => {
    try {
      const response = await apiInstance.get(`studies/${id}/`);
      setModifiedStudy(response);
      console.log('Response:', response);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchDangerData();
  }, [id]);

  const handleUpdate = async (selectedDate) => {
    const formData = new FormData();
    formData.append('owner', modifiedStudy.owner);
    formData.append('title', modifiedStudy.title);
    formData.append('description', modifiedStudy.description);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    formData.append('date', formattedDate);

    try {
      const response = await apiInstance.patch(`studies/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setModifiedStudy(response);
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
    setModifiedStudy((prevStudy) => ({
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
      mode='update'
      handleChange={handleChange}
      handleUpdate={handleUpdate}
      modifiedStudy={modifiedStudy}
    />
    </>
  );
};

export default StudyUpdate;
