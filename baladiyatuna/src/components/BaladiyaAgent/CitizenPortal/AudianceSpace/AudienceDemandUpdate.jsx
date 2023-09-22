import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../../../API";
import AudienceDemandDetails from "./AudianceDemandDetails";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";

const AudienceDemandUpdate = () => {
  const { id } = useParams();
  const [modifiedDemand, setModifiedDemand] = useState(null);
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
    const fetchDemandData = async () => {
      try {
        const response = await apiInstance.get(`audiance_demands/${id}/`);
        setModifiedDemand(response); 
      } catch (error) {
        console.log('Error fetching demand data', error);
      }
    };

    fetchDemandData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedDemand((prevDemand) => ({
      ...prevDemand,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`audiance_demands/${id}/`, { state });
      setModifiedDemand((prevDemand) => ({
        ...prevDemand,
        state: response?.state,
      }));
    } catch (error) {
      console.log('Error updating demand state', error);
    }
  };

  const handleUpdate = async (selectedDate) => {
    const data = {
      title: modifiedDemand.title,
      description: modifiedDemand.description,
      owner: modifiedDemand.owner,
      date: selectedDate.toISOString().split('T')[0], 
      person: modifiedDemand.person,
    };
    
    try {
      const response = await apiInstance.patch(`audiance_demands/${modifiedDemand.id}/`, data);
      setModifiedDemand(response);
      setsuccessMsg(t('demande modifiée avec succès!'));
      setSuccessOpen(true);
      console.log('Response after update:', response);
    } catch (error) {
      console.log('Error updating demand', error);
      setErrorMsg(t('modification échouée'));
      setToastOpen(true);
    }
  };

  if (!modifiedDemand) {
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
    <AudienceDemandDetails
      mode="update"
      handleChange={handleChange}
      handleSwitchChange={handleSwitchChange}
      handleUpdate={handleUpdate}
      modifiedDemand={modifiedDemand}
    />
    </>
  );
};

export default AudienceDemandUpdate;
