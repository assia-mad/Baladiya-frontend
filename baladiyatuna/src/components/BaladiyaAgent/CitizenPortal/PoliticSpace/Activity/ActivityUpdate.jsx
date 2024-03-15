import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import ActivityDetails from "./ActivityDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";
import algeriaCities from "../../../../../../dzData.json";

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};

const ActivityUpdate = () => {
  const { id } = useParams();
  const [modifiedActivity, setModifiedActivity] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState(null);
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
    const fetchActivityData = async () => {
      try {
        const response = await apiInstance.get(`activities/${id}/`);
        setModifiedActivity(response);
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
      } catch (error) {
        console.log('Error fetching activity data', error);
      }
    };

    fetchActivityData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`activities/${id}/`, { state });
      setModifiedActivity((prevActivity) => ({
        ...prevActivity,
        state: response?.state,
      }));
    } catch (error) {
      console.log('Error updating activity state', error);
    }
  };

  const handleUpdate = async (selectedDate) => {
    const formData = new FormData();

    formData.append('title', modifiedActivity.title);
    formData.append('description', modifiedActivity.description);
    formData.append('date', selectedDate.toISOString());
    formData.append('localisation', modifiedActivity.localisation);
    formData.append('directed_by', modifiedActivity.directed_by);
    if (communeCode){
      formData.append('commune',parseInt(communeCode,10));
    }

    try {
      const response = await apiInstance.patch(`activities/${modifiedActivity.id}/`, formData);
      setModifiedActivity(response);
      setSuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
      console.log('Response after update:', response);
    } catch (error) {
      console.log('Error updating activity', error);
      setErrorMsg(t('modification echouée'));
      setToastOpen(true);
    }
  };

  if (!modifiedActivity) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ErrorSnackbar open={isToastOpen} onClose={handleToastClose} errorMsg={errorMsg} />
      <SuccessSnackbar open={isSuccessOpen} onClose={handleToastClose} successMsg={successMsg} />
      <ActivityDetails
        mode="update"
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleUpdate={handleUpdate}
        modifiedActivity={modifiedActivity}
        selectedCommune={selectedCommune}
        setSelectedCommune={setSelectedCommune}
        selectedCommuneName={selectedCommuneName}
        topicWilaya={wilayaCode}
        setSelectedCommuneName={setSelectedCommuneName}
        communeCode={communeCode}
        setCommuneCode={setCommuneCode}
      />
    </>
  );
};

export default ActivityUpdate;
