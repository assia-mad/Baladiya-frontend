import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../API";
import HistoriqueDetails from "./HistoriqueDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";
import algeriaCities from "../../../../../dzData.json";

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};

const HistoriqueUpdate = () => {
  const { id } = useParams();
  const [modifiedHistorique, setModifiedHistorique] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState('');
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
    setSuccessOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`history/${id}/`);
      setModifiedHistorique(response); 
      console.log('respooooooooooooooooooooooooooooonse',response);
      setSelectedCommune(response?.commune);
      setSelectedCommuneName(getCommuneNameById(response?.commune));
      setWilayaCode(getWilayaCodeByCommuneId(response?.commune));
    } catch (error) {
      console.log('Error fetching historique data', error);
      setErrorMsg(t('Error fetching data'));
      setToastOpen(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedHistorique((prevHistorique) => ({
      ...prevHistorique,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`history/${id}/`, { state });
      setModifiedHistorique(response);
    } catch (error) {
      console.log('Error updating historique state', error);
      setErrorMsg(t('Error updating state'));
      setToastOpen(true);
    }
  };

  const handleUpdate = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    const formData = new FormData();
    formData.append('event', modifiedHistorique.event);
    formData.append('date', formattedDate);
    formData.append('owner', modifiedHistorique.owner);
    formData.append('state', modifiedHistorique.state);

    if (communeCode) {
      const parsedCommune = parseInt(communeCode, 10);
      formData.append('commune', parsedCommune);
    }

    if (wilayaCode) {
      formData.append('wilaya', wilayaCode);
    }

    try {
      const response = await apiInstance.patch(`history/${modifiedHistorique.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setModifiedHistorique(response);
      setSuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
      console.log('Response after update:', response);
    } catch (error) {
      console.log('Error updating historique', error);
      setErrorMsg(t('Modification échouée'));
      setToastOpen(true);
    }
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
      <HistoriqueDetails
        mode="update"
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleUpdate={handleUpdate}
        modifiedHistorique={modifiedHistorique}
        selectedCommune={selectedCommune}
        setSelectedCommune={setSelectedCommune}
        setSelectedCommuneName={setSelectedCommuneName}
        selectedCommuneName={selectedCommuneName}
        historiqueWilaya={wilayaCode}
        communeCode={communeCode}
        setCommuneCode={setCommuneCode}
      />
    </>
  );
};

export default HistoriqueUpdate;
