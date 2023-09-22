import React, { useState, useEffect } from "react";
import AlbumDetails from "./AlbumDetails"; 
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../../../API";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";

const AlbumUpdate = () => {
  const { id } = useParams();
  const [modifiedAlbum, setModifiedAlbum] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (isToastOpen) {
      setToastOpen(false);
    } else {
      setSuccessOpen(false);
    }
  };

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await apiInstance.get(`albums/${id}/`);
        setModifiedAlbum(response);
        console.log('Response:', response);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchAlbumData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedAlbum((prevAlbum) => ({
      ...prevAlbum,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", modifiedAlbum.name);
    formData.append("commune",modifiedAlbum.commune);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await apiInstance.patch(
        `albums/${modifiedAlbum.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setModifiedAlbum(response);
      setSuccessMsg(t("Album modifié avec succès!"));
      setSuccessOpen(true);
      console.log('Update Response:', response);
    } catch (error) {
      console.log('Update Error:', error);
      setErrorMsg(t("Modification échouée"));
      setToastOpen(true);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };
  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`albums/${id}/`, { state });
      setModifiedAlbum((prevAlbum) => ({
        ...prevAlbum,
        state: newState,
      }));
    } catch (error) {
      console.log('Failed to change visit state:', error);
    }
  };
  

  if (!modifiedAlbum) {
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
      <AlbumDetails
        mode="update"
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleImageUpload={handleImageUpload}
        modifiedAlbum={modifiedAlbum}
        handleSwitchChange={handleSwitchChange}
      />
    </>
  );
};

export default AlbumUpdate;
