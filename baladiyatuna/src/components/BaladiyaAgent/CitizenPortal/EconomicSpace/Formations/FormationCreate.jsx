import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import EconomicFormationDetails from "./FormationDetails";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const EconomicFormationCreate = () => {
  const [formation, setFormation] = useState({
    title: '',
    description: '',
    date: new Date(),
    localisation: '',
    owner: null
  });
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState('');
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState(null);
  const [currentUserCommune, setCurrentUSerCommune] = useState(false);
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
      setUserId(response.id);
      setCurrentUSerCommune(response.commune);
    } catch (error) {
      console.log(error);
      setErrorMsg(t('Echec de trouver owner ID'));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormation((prevFormation) => ({
      ...prevFormation,
      [name]: value,
    }));
  };

  const handleCreate = async (selectedDate) => {
    const parsedCommune = communeCode ? parseInt(communeCode, 10): parseInt(currentUserCommune,10);
    const data = {
      title: formation.title,
      description: formation.description,
      date: selectedDate.toISOString(),
      localisation: formation.localisation,
      owner: userId,
      commune : parsedCommune,
      type: 'Economique',
      state:'validé',
    };

    try {
      const response = await apiInstance.post(`formations/`, data);
      setSuccessOpen(true);
      setsuccessMsg(t("formation créer avec succes!"))
      console.log('Response of create:', response);
      setFormation({
        title: '',
        description: '',
        date: new Date(),
        localisation: '',
        owner: null,
      });
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
      <EconomicFormationDetails 
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedFormation={formation}
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

export default EconomicFormationCreate;
