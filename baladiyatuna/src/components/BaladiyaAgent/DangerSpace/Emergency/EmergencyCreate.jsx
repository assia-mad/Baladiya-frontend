import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../../../API";
import EmergencyDetails from "./EmergencyDetails";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";

const EmergencyCreate = () => {
  const [emergency, setEmergency] = useState({
    title: "",
    description: "",
    type: "",
    public: false, 
  });
  const [userId, setUserId] = useState(null);
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
    getCurrentUserId();
  }, []);

  const getCurrentUserId = async () => {
    try {
      const response = await apiInstance.get(`user/`);
      setUserId(response.id);
    } catch (error) {
      console.log(error);
      setErrorMsg(t("Failed to fetch owner ID"));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergency((prevEmergency) => ({
      ...prevEmergency,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const data = {
      title: emergency.title,
      description: emergency.description,
      type: emergency.type,
      public: emergency.public,
      owner: userId,
    };

    try {
      const response = await apiInstance.post(`emergencies/`, data);
      setSuccessOpen(true);
      setSuccessMsg(t("Creation successful!"));
      console.log("Response of create:", response);
      setEmergency({
        title: "",
        description: "",
        type: "",
        public: true,
      });
    } catch (error) {
      setToastOpen(true);
      setErrorMsg(t("Creation failed"));
      console.log("Error creation", error);
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
      <EmergencyDetails
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedEmergency={emergency}
      />
    </>
  );
};

export default EmergencyCreate;
