import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../../../API";
import AudienceDemandDetails from "./AudianceDemandDetails";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";

const AudienceDemandCreate = () => {
  const [demand, setDemand] = useState({
    owner: null,
    person: "",
    meet_type: 'Privé', 
    public_meet_type: 'Autre',  
    date: new Date() 
  });
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
    setSuccessOpen(false);
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
      setErrorMsg(t("Echec de trouver owner ID"));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDemand((prevDemand) => ({
      ...prevDemand,
      [name]: value,
    }));
  };

  const handleCreate = async (selectedDate) => {
    const data = {
      owner: userId,
      date: selectedDate.toISOString().split('T')[0],
      person: demand.person,
      meet_type: demand.meet_type,
      public_meet_type: demand.public_meet_type,
    };

    try {
      const response = await apiInstance.post(`audiance_demands/`, data);
      setSuccessOpen(true);
      setsuccessMsg(t("La creation a réussi!"));
      console.log("Response of create:", response);
      setDemand({
        owner: null,
        person: "",
        meet_type: 'Privé',
        public_meet_type: 'Autre',
        state: 'en traitement',
        date: new Date()
      });
    } catch (error) {
      setToastOpen(true);
      setErrorMsg(t("Creation echouée"));
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
      <AudienceDemandDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedDemand={demand}
      />
    </>
  );
};

export default AudienceDemandCreate;
