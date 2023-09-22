import React, { useState, useEffect } from "react";
import apiInstance from "../../../API";
import TopicDetails from "./TopicDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../Tools/SuccessSnackBar";
import ErrorSnackbar from "../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";

const TopicDetailsComponent = () => {
  const { id } = useParams();
  const [modifiedTopic, setModifiedTopic] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState('');
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
    const fetchTopicData = async () => {
      try {
        const response = await apiInstance.get(`topics/${id}/`);
        setModifiedTopic(response); 
        console.log('Response:', response);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchTopicData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedTopic((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`topics/${id}/`, { state });
      setModifiedTopic((prevTopic) => ({
        ...prevTopic,
        state: newState,
      }));
      console.log('Switch Change Response:', response);
    } catch (error) {
      console.log('Switch Change Error:', error);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', modifiedTopic.title);
    formData.append('description', modifiedTopic.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    console.log('FormData:', formData);

    try {
      const response = await apiInstance.patch(`topics/${modifiedTopic.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModifiedTopic(response);
      setsuccessMsg(t('topic modifié avec succés!'));
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

  if (!modifiedTopic) {
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
    <TopicDetails
      mode="update"
      handleChange={handleChange}
      handleSwitchChange={handleSwitchChange}
      handleUpdate={handleUpdate}
      modifiedTopic={modifiedTopic}
      handleImageUpload={handleImageUpload}
    />
    </>
  );
};

export default TopicDetailsComponent;
