import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import LocalPartonatDetails from "./LocalPatronatDetails";
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

const LocalPartonatUpdate = () => {
  const { id } = useParams();
  const [modifiedLocalPartonat, setModifiedLocalPartonat] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [comments, setComments] = useState([]);
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
    }
    else { setSuccessOpen(false)}
  };

  useEffect(() => {
    const fetchLocalPartonatData = async () => {
      try {
        const response = await apiInstance.get(`discussions/${id}/`);
        setModifiedLocalPartonat(response); 
        const communeID = response.commune;
        setSelectedCommune(communeID);
        const communeName = getCommuneNameById(communeID);
        setSelectedCommuneName(communeName);
        const wilayaCode = getWilayaCodeByCommuneId(communeID);
        setWilayaCode(wilayaCode);
        console.log('Local Partonat Response:', response);
      } catch (error) {
        console.log('Local Partonat Error:', error);
      }
    };

    fetchLocalPartonatData();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiInstance.get(`comments/`); 
        setComments(response.results); 
        console.log('Comments:', response.results);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchComments();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedLocalPartonat((prevPatronat) => ({
      ...prevPatronat,
      [name]: value,
    }));
  };

 const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', modifiedLocalPartonat.title);
    formData.append('description', modifiedLocalPartonat.description);
    if (communeCode){
      formData.append('commune',parseInt(communeCode));
    };
    if (imageFile) {
      formData.append('image', imageFile);
    }

    console.log('FormData:', formData);

    try {
      const response = await apiInstance.patch(`discussions/${modifiedLocalPartonat.id}/`, formData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModifiedLocalPartonat(response);
      setSuccessMsg(t('discussion modifiée avec succés!'));
      setSuccessOpen(true);
      console.log('Update Response:', response);
    } catch (error) {
      console.log('Update Erroooooooooooooor:', error);
      setErrorMsg(t('modification echouée'));
      setToastOpen(true);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };
  
  if (!modifiedLocalPartonat) {
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
        mode="update" 
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        modifiedLocalPartonat={modifiedLocalPartonat}
        handleImageUpload={handleImageUpload}
        comments={comments}
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

export default LocalPartonatUpdate;
