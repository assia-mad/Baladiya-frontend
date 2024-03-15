import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import ActivityDetails from "./ActivityDetails";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const ActivityCreate = () => {
  const [activity, setActivity] = useState({
    title: '',
    description: '',
    date: new Date(),
    localisation: '',
    directed_by: '', 
    owner: null,
  });
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
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
      setUserId(response?.id);
      setCurrentUSerCommune(response?.commune);
    } catch (error) {
      console.log(error);
      setErrorMsg(t('Echec de trouver owner ID'));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };

  const handleCreate = async (selectedDate) => {
    const parsedCommune = communeCode ? parseInt(communeCode, 10): parseInt(currentUserCommune,10);
    const data = {
      title: activity.title,
      description: activity.description,
      date: selectedDate.toISOString(),
      localisation: activity.localisation,
      directed_by: activity.directed_by, 
      owner: userId,
      commune: parsedCommune,
    };
    try {
      const response = await apiInstance.post(`activities/`, data);
      setSuccessOpen(true);
      setSuccessMsg(t("Activity créer avec succées!"));
      console.log('Response of create:', response);
    } catch (error) {
      setToastOpen(true);
      setErrorMsg(t('Creation echouée'));
      console.log('Error creation', error);
    }
  };

  return (
    <>
      <ErrorSnackbar open={isToastOpen} onClose={handleToastClose} errorMsg={errorMsg} />
      <SuccessSnackbar open={isSuccessOpen} onClose={handleToastClose} successMsg={successMsg} />
      <ActivityDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedActivity={activity}
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

export default ActivityCreate;
