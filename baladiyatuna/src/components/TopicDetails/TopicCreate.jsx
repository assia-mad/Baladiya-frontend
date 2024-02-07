import React, { useEffect } from "react";
import { useState } from "react";
import TopicDetails from "./TopicDetails";
import apiInstance from "../../../API";
import ErrorSnackbar from "../Tools/ErrorSnackBar";
import SuccessSnackbar from "../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const CreateTopic = () => {
    const [topic, setTopic] = useState({
        title :"",
        description :'',
    })
    const [imageFile, setImageFile] = useState(null);
    const [userId, setUserId] = useState(null);
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
      getCurrentUserId();
    },[]);

    const getCurrentUserId = async () => {
        try {
          const response = await apiInstance.get(`user/`);
          setUserId(response.id);
          console.log()
        }catch(error){
          console.log(error); 
          setErrorMsg(t('Echec de trouver owner ID'));
          setToastOpen(true); 
        }
    };

    const handleCreate = async () => {
      const formData = new FormData();
      const parsedUserId = parseInt(userId, 10); 
      formData.append('owner', parsedUserId);
      formData.append('title', topic.title);
      formData.append('description', topic.description);
      formData.append('type','Sportif');
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      try {
        const response = await apiInstance.post(`topics/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log(response);
        setSuccessOpen(true);
        setsuccessMsg(t('La creation a réussi!'));
      } catch (error) {
        console.log(error);
        setErrorMsg(t('Création échouée'));
        setToastOpen(true);
      }
    };
    
    const handleChange = (e) => {
    const { name, value } = e.target;
    setTopic((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
    };
    const handleImageUpload = (event) => {
        const selectedFile = event.target.files[0];
        setImageFile(selectedFile);
        console.log('Selected file:', selectedFile);
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
        <TopicDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        handleImageUpload={handleImageUpload}
        modifiedTopic={topic}
        />
      </>
    );
}
export default CreateTopic;