import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import AgendaDetails from "./AgendaDetails"; 
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";
import algeriaCities from "../../../../../../dzData.json";

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaCodeByCommuneId = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.wilaya_code : null;
};

const AgendaUpdate = () => {
  const { id } = useParams();
  const [modifiedAgenda, setModifiedAgenda] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState('');
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
    const fetchAgendaData = async () => {
      try {
        const response = await apiInstance.get(`agendas/${id}/`);
        setModifiedAgenda(response); 
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
      } catch (error) {
        console.log('Error fetching agenda data', error);
      }
    };

    fetchAgendaData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedAgenda((prevAgenda) => ({
      ...prevAgenda,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`agendas/${id}/`, { state });
      setModifiedAgenda((prevAgenda) => ({
        ...prevAgenda,
        state: response?.state,
      }));
    } catch (error) {
      console.log('Error updating agenda state', error);
    }
  };

  const handleUpdate = async (selectedDate) => {
    const data = {
      title: modifiedAgenda.title,
      description: modifiedAgenda.description,
      date: selectedDate.toISOString(),
      localisation: modifiedAgenda.localisation,
    };
    const formData = new FormData();
    formData.append('title',modifiedAgenda.title);
    formData.append('description',modifiedAgenda.description);
    formData.append('localisation',modifiedAgenda.localisation);
    formData.append('date',selectedDate.toISOString());
    if (imageFile){
        formData.append('image',imageFile);
    }
    if(communeCode){
      formData.append('commune',parseInt(communeCode,10));
    }

    try {
      const response = await apiInstance.patch(`agendas/${modifiedAgenda.id}/`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
          },
      });
      setModifiedAgenda(response);
      setsuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
      console.log('Response after update:', response);
    } catch (error) {
      console.log('Error updating agenda', error);
      setErrorMsg(t('La modification a echouée'));
      setToastOpen(true);
    }
  };
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  if (!modifiedAgenda) {
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
      <AgendaDetails
        mode="update"
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleUpdate={handleUpdate}
        modifiedAgenda={modifiedAgenda}
        handleImageUpload={handleImageUpload}
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

export default AgendaUpdate;
