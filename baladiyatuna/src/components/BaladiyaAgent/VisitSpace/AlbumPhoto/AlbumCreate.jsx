import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AlbumDetails from "./AlbumDetails";
import apiInstance from "../../../../../API";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import Wilayas from "../../../Tools/Wilayas";

const AlbumCreate = () => {
  const [album, setAlbum] = useState({
    name: "",
    commune: "",
    state: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const { t } = useTranslation();

  const handleWilayaChange = (event) => {
    setSelectedWilaya(event.target.value);
  };
  
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
    getCurrentUserId();
  }, []);

  const getCurrentUserId = async () => {
    try {
      const response = await apiInstance.get(`user/`);
      setUserId(response.id);
    } catch (error) {
      console.log(error);
      setErrorMsg(t("Echec de trouver owner ID"));
      setToastOpen(true);
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    const parsedUserId = parseInt(userId, 10);
    formData.append("owner", parsedUserId);
    formData.append("name", album.name);
    formData.append("commune", album.commune);
    formData.append("state", album.state);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await apiInstance.post(`albums/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessOpen(true);
      setSuccessMsg(t("La création a réussi!"));
    } catch (error) {
      console.log(error);
      setErrorMsg(t("Création échouée"));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    console.log("Selected file:", selectedFile);
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
      <AlbumDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        handleImageUpload={handleImageUpload}
        modifiedAlbum={album}
      />
    </>
  );
};

export default AlbumCreate;
