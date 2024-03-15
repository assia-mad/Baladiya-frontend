import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import InformationDetails from "./InformationDetails"; 
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const InformationCreate = () => {
  const [information, setInformation] = useState({
    title: '',
    description: '',
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
  const [isAdmin, setIsAdmin] = useState(false);
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
      setErrorMsg(t('Echec de trouver owner ID'));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInformation((prevInformation) => ({
      ...prevInformation,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const parsedCommune = communeCode ? parseInt(communeCode, 10): parseInt(currentUserCommune,10);
    const data = {
      title: information.title,
      description: information.description,
      owner: userId,
      commune:parsedCommune,
    };

    try {
      const response = await apiInstance.post(`social_informations/`, data);
      setSuccessOpen(true);
      setSuccessMsg(t("La creation a réussi!"));
      console.log('Response of create:', response);
    } catch (error) {
      setToastOpen(true);
      setErrorMsg(t('Creation echouée'));
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
      <InformationDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedInformation={information}
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

export default InformationCreate;
