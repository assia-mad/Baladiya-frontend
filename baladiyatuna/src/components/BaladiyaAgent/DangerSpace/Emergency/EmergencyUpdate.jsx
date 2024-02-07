import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../../../API";
import EmergencyDetails from "./EmergencyDetails";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";

const EmergencyUpdate = () => {
  const { id } = useParams();
  const [modifiedEmergency, setModifiedEmergency] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (isToastOpen) {
      setToastOpen(false);
    } else {
      setSuccessOpen(false);
    }
  };

  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const response = await apiInstance.get(`emergencies/${id}/`);
        setModifiedEmergency(response);
      } catch (error) {
        console.log("Error fetching emergency data", error);
      }
    };

    fetchEmergencyData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedEmergency((prevEmergency) => ({
      ...prevEmergency,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`emergencies/${id}/`, { state });
      setModifiedEmergency((prevEmergency) => ({
        ...prevEmergency,
        state: response?.state,
      }));
    } catch (error) {
      console.log("Error updating emergency state", error);
    }
  };

  const handleUpdate = async () => {
    const data = {
      title: modifiedEmergency.title,
      description: modifiedEmergency.description,
      type: modifiedEmergency.type,
      state: modifiedEmergency.state,
      public: modifiedEmergency.public,
    };

    try {
      const response = await apiInstance.patch(`emergencies/${modifiedEmergency.id}/`, data);
      setModifiedEmergency(response);
      setSuccessMsg(t("Emergency updated successfully!"));
      setSuccessOpen(true);
      console.log("Response after update:", response);
    } catch (error) {
      console.log("Error updating emergency", error);
      setErrorMsg(t("Update failed"));
      setToastOpen(true);
    }
  };

  if (!modifiedEmergency) {
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
      <EmergencyDetails
        mode="update"
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleUpdate={handleUpdate}
        modifiedEmergency={modifiedEmergency}
      />
    </>
  );
};

export default EmergencyUpdate;
