import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SuccessSnackbar from "../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../Tools/ErrorSnackBar";
import apiInstance from "../../../../API";
import DangerDetails from "./DangerDetails";

const DangerUpdate = () => {
  const { id } = useParams();
  const [modifiedDanger, setModifiedDanger] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
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

  const fetchDangerData = async () => {
    try {
      const response = await apiInstance.get(`danger_informations/${id}/`);
      setModifiedDanger(response);
      console.log('Response:', response);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchDangerData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedDanger((prevDanger) => ({
      ...prevDanger,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`danger_informations/${id}/`, { state });
      setModifiedDanger((prevDanger) => ({
        ...prevDanger,
        state: newState,
      }));
      console.log('Switch Change Response:', response);
    } catch (error) {
      console.log('Switch Change Error:', error);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', modifiedDanger.title);
    formData.append('description', modifiedDanger.description);
    formData.append('type',selectedType);
    console.log('the updated code', selectedType);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    console.log('FormData:', formData);

    try {
      const response = await apiInstance.patch(`danger_informations/${modifiedDanger.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModifiedDanger(response);
      setSuccessMsg(t('Danger modifié avec succès'));
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

  if (!modifiedDanger) {
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
      <DangerDetails
        mode="update"
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleUpdate={handleUpdate}
        modifiedDanger={modifiedDanger}
        handleImageUpload={handleImageUpload}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
    </>
  );
};

export default DangerUpdate;
