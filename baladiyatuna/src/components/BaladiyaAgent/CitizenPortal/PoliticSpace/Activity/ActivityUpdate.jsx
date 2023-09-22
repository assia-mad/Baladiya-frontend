import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import ActivityDetails from "./ActivityDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";

const ActivityUpdate = () => {
  const { id } = useParams();
  const [modifiedActivity, setModifiedActivity] = useState(null);
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
    const fetchActivityData = async () => {
      try {
        const response = await apiInstance.get(`activities/${id}/`);
        setModifiedActivity(response);
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
    const data = {
      title: modifiedActivity.title,
      description: modifiedActivity.description,
      date: selectedDate.toISOString(),
      localisation: modifiedActivity.localisation,
      directed_by: modifiedActivity.directed_by, 
    };

    try {
      const response = await apiInstance.patch(`activities/${modifiedActivity.id}/`, data);
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
      />
    </>
  );
};

export default ActivityUpdate;
