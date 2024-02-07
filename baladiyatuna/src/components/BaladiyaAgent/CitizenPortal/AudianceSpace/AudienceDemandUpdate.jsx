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
    setToastOpen(false);
    setSuccessOpen(false);
  };

  useEffect(() => {
    const fetchDemandData = async () => {
      try {
        const response = await apiInstance.get(`audiance_demands/${id}/`);
        setModifiedDemand({ ...response, date: new Date(response?.date) }); 
      } catch (error) {
        console.log('Error fetching demand data', error);
        setErrorMsg(t('Erreur de chargement des données'));
        setToastOpen(true);
      }
    };

    fetchDemandData();
  }, [id, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedDemand((prevDemand) => ({
      ...prevDemand,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const response = await apiInstance.patch(`audiance_demands/${id}/`, { state: newState });
      setModifiedDemand((prevDemand) => ({
        ...prevDemand,
        state: response?.state,
      }));
      setsuccessMsg(t('État modifié avec succès!'));
      setSuccessOpen(true);
    } catch (error) {
      console.log('Error updating demand state', error);
      setErrorMsg(t('Échec de la mise à jour de l\'état'));
      setToastOpen(true);
    }
  };

  const handleUpdate = async (selectedDate) => {
    const data = {
      owner: modifiedDemand.owner,
      date: selectedDate.toISOString().split('T')[0],
      person: modifiedDemand.person,
      meet_type: modifiedDemand.meet_type,
      public_meet_type: modifiedDemand.public_meet_type,
      state: modifiedDemand.state
    };

    try {
      const response = await apiInstance.patch(`audiance_demands/${id}/`, data);
      setModifiedDemand({ ...response, date: new Date(response?.date) });
      setsuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
    } catch (error) {
      console.log('Error updating demand', error);
      setErrorMsg(t('Modification échouée'));
      setToastOpen(true);
    }
  };

  if (!modifiedDemand) {
    return <div>{t('Chargement...')}</div>;
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
