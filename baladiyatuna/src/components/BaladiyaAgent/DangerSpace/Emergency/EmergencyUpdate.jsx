import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../../../API";
import EmergencyDetails from "./EmergencyDetails";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import algeriaCities from "../../../../../dzData.json";

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};

const EmergencyUpdate = () => {
  const { id } = useParams();
  const [modifiedEmergency, setModifiedEmergency] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState(null);
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
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
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
    const formData = new FormData();
    formData.append('title',modifiedEmergency.title);
    formData.append('description', modifiedEmergency.description);
    formData.append('type',modifiedEmergency.type);
    formData.append('state',modifiedEmergency.state);
    formData.append('public',modifiedEmergency.public);
    if (communeCode) {
      formData.append('commune', parseInt(communeCode, 10));
    }

    try {
      const response = await apiInstance.patch(`emergencies/${modifiedEmergency.id}/`, formData);
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

export default EmergencyUpdate;
