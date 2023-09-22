import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EconomicFormationDetails from "./FormationDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import apiInstance from "../../../../../../API";


const EconomicFormationUpdate= () => {
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
    } else {
      setSuccessOpen(false);
    }
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

  const handleUpdate = async (selectedDate) => {
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
    <EconomicFormationDetails
      mode="update"
      handleChange={handleChange}
      handleUpdate={handleUpdate}
      modifiedFormation={modifiedFormation}
    />
    </>
  );
};

export default EconomicFormationUpdate;
