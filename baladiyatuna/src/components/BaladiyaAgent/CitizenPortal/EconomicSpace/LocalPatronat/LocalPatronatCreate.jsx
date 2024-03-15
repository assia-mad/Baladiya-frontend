import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import LocalPartonatDetails from "./LocalPatronatDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";

const LocalPartonatCreate = () => {
  const [localPartonat, setLocalPartonat] = useState({
    title: '',
    description: ''
  });
  const [userId, setUserId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [selectedCommuneName, setSelectedCommuneName] = useState('');
  const [communeCode, setCommuneCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState(null);
  const [currentUserCommune, setCurrentUSerCommune] = useState(false);

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
    setIsLoading(false); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPartonat((prevDiscussion) => ({
      ...prevDiscussion,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('title', localPartonat.title);
    formData.append('description',localPartonat.description);
    formData.append('owner',userId);
    formData.append('type','Economique');
    const parsedCommune = communeCode ? parseInt(communeCode, 10): parseInt(currentUserCommune,10);
    formData.append('commune',parsedCommune);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    console.log('FormData:', formData);

    try {
      const response = await apiInstance.post(`discussions/`, formData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLocalPartonat({
        title:'',
        description:''
      });
      setImageFile(null);
      setSuccessMsg(t('discussion modifiée avec succés!'));
      setSuccessOpen(true);
      console.log('Update Response:', response);
    } catch (error) {
      console.log('Update Error:', error);
      setErrorMsg(t('modification echouée'));
      setToastOpen(true);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  if (isLoading) {
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
      <LocalPartonatDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedLocalPartonat={localPartonat}
        handleImageUpload={handleImageUpload}
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

export default LocalPartonatCreate;
