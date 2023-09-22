import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import FormationDetails from "./FormationDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";

const FormationDetailsComponent = () => {
  const { id } = useParams();
  const [modifiedFormation, setModifiedFormation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState('');
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (isToastOpen) {
      setToastOpen(false);
    }
    else { setSuccessOpen(false)}
  };

  useEffect(() => {
    const fetchFormationData = async () => {
      try {
        const response = await apiInstance.get(`formations/${id}/`);
        setModifiedFormation(response); 
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

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`formations/${id}/`, { state });
      setModifiedFormation((prevFormation) => ({
        ...prevFormation,
        state: response?.state,
      }));
    } catch (error) {
      console.log('Error updating formation state', error);
    }
  };

  const handleUpdate = async (selectedDate) => {
    console.log("tyyyyyyyyyyyyyyyyyyyyyype of date",typeof selectedDate);
    const data = {
      title: modifiedFormation.title,
      description: modifiedFormation.description,
      date: selectedDate.toISOString(), 
      localisation: modifiedFormation.localisation,
    };
    
    try {
      const response = await apiInstance.patch(`formations/${modifiedFormation.id}/`, data);
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
    <FormationDetails
      mode="update"
      handleChange={handleChange}
      handleSwitchChange={handleSwitchChange}
      handleUpdate={handleUpdate}
      modifiedFormation={modifiedFormation}
    />
    </>
  );
};

export default FormationDetailsComponent;
