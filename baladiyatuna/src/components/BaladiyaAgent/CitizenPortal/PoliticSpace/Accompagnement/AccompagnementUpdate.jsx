import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import AccompagnementDetails from "./AccompagnementDetails";
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

const AccompagnementUpdate = () => {
  const { id } = useParams();
  const [modifiedAccompagnement, setModifiedAccompagnement] = useState(null);
  const [imageFile, setImageFile] = useState(null);
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
    const fetchAccompagnementData = async () => {
      try {
        const response = await apiInstance.get(`accompagnements/${id}/`);
        setModifiedAccompagnement(response);
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
        console.log('Response:', response);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchAccompagnementData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedAccompagnement((prevAccompagnement) => ({
      ...prevAccompagnement,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`accompagnements/${id}/`, { state });
      setModifiedAccompagnement((prevAccompagnement) => ({
        ...prevAccompagnement,
        state: newState,
      }));
      console.log('Switch Change Response:', response);
    } catch (error) {
      console.log('Switch Change Error:', error);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', modifiedAccompagnement.title);
    formData.append('description', modifiedAccompagnement.description);
    if (communeCode){
      formData.append('commune',parseInt(communeCode));
    };
    if (imageFile) {
      formData.append('image', imageFile);
    }

    console.log('FormData:', formData);

    try {
      const response = await apiInstance.patch(`accompagnements/${modifiedAccompagnement.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModifiedAccompagnement(response);
      setSuccessMsg(t('Accompagnement modifié avec succès'));
      setSuccessOpen(true);
      console.log('Update Response:', response);
    } catch (error) {
      console.log('Update Error:', error);
      setErrorMsg(t('Modification échouée'));
      setToastOpen(true);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  if (!modifiedAccompagnement) {
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
      <AccompagnementDetails
        mode="update"
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleUpdate={handleUpdate}
        modifiedAccompagnement={modifiedAccompagnement}
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

export default AccompagnementUpdate;
