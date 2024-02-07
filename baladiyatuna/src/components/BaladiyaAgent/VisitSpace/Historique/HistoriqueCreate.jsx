import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../API";
import HistoriqueDetails from "./HistoriqueDetails";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const HistoriqueCreate = () => {
  const [historique, setHistorique] = useState({
    event: '',
    date: new Date(),
    owner: null,
    state: '',
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
      setUserId(response.id);
    } catch (error) {
      console.log(error);
      setErrorMsg(t('Failed to retrieve owner ID'));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHistorique((prevHistorique) => ({
      ...prevHistorique,
      [name]: value,
    }));
  };

  const handleCreate = async (selectedDate) => {
    const parsedUserId = parseInt(userId, 10);
    const formData = new FormData();
    formData.append('owner', parsedUserId);
    formData.append('event', historique.event);
    formData.append('date', selectedDate.toISOString().split('T')[0],);
    formData.append('state', historique.state);
    if (communeCode)  {
        const parsedCommune = parseInt(communeCode, 10);
        formData.append("commune", parsedCommune);
        console.log('the comuuuuune sent to update',parsedCommune);
      }

    try {
      const response = await apiInstance.post(`history/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessOpen(true);
      setSuccessMsg(t("Creation successful!"))
      console.log('Response of create:', response);
    } catch (error) {
      setToastOpen(true);
      setErrorMsg(t('Creation échouée'))
      console.log('Error creation', error);
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
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedHistorique={historique}
        selectedCommune={selectedCommune}
        setSelectedCommune = {setSelectedCommune}
        setSelectedCommuneName={setSelectedCommuneName}
        selectedCommuneName={selectedCommuneName}
        historiqueWilayaWilaya={wilayaCode}
        communeCode={communeCode}
        setCommuneCode={setCommuneCode}
      />
    </>
  );
};

export default HistoriqueCreate;
