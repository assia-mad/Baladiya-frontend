import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../API";
import DangerDiscussionDetails from "./DangerDiscussionDetails";
import { useParams } from "react-router-dom";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import { useTranslation } from "react-i18next";

const DangerDiscussionUpdate = () => {
  const { id } = useParams();
  const [modifiedDiscussion, setModifiedDiscussion] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState('');
  const [comments, setComments] = useState([]);
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
    const fetchDiscussionData = async () => {
      try {
        const response = await apiInstance.get(`discussions/${id}/`);
        setModifiedDiscussion(response); 
        console.log('Response:', response);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchDiscussionData();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiInstance.get(`comments/`); 
        setComments(response.results); 
        console.log('this is my Comments:', response.results);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchComments();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedDiscussion((prevDiscussion) => ({
      ...prevDiscussion,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`discussions/${id}/`, { state }); 
      setModifiedDiscussion((prevDiscussion) => ({
        ...prevDiscussion,
        state: newState,
      }));
      console.log('Switch Change Response:', response);
    } catch (error) {
      console.log('Switch Change Error:', error);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', modifiedDiscussion.title);
    formData.append('description', modifiedDiscussion.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    console.log('FormData:', formData);

    try {
      const response = await apiInstance.patch(`discussions/${modifiedDiscussion.id}/`, formData, { 
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModifiedDiscussion(response);
      setsuccessMsg(t('discussion modifiée avec succés!'));
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

  if (!modifiedDiscussion) {
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
    <DangerDiscussionDetails
      handleChange={handleChange}
      handleSwitchChange={handleSwitchChange}
      handleUpdate={handleUpdate}
      modifiedDiscussion={modifiedDiscussion}
      handleImageUpload={handleImageUpload}
      comments={comments}
    />
    </>
  );
};

export default DangerDiscussionUpdate;
