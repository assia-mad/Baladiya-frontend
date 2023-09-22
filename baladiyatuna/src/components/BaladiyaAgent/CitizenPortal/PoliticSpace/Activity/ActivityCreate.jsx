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
      setUserId(response?.id);
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
    const data = {
      title: activity.title,
      description: activity.description,
      date: selectedDate.toISOString(),
      localisation: activity.localisation,
      directed_by: activity.directed_by, 
      owner: userId,
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
      />
    </>
  );
};

export default ActivityCreate;
