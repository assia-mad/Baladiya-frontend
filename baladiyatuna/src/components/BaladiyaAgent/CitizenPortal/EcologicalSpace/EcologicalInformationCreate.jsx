import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../API";
import EcologicalInformationDetails from "./EcologicalInformationDetails";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const EcologicalInformationCreate = () => {
  const [ecologicalInformation, setEcologicalInformation] = useState({
    title: "",
    description: "",
    type: "valorisation",
    owner: null,
  });
  const [userId, setUserId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEcologicalInformation((prevEcologicalInformation) => ({
      ...prevEcologicalInformation,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    const formData  = new FormData();
    formData.append('title',ecologicalInformation.title);
    formData.append('description',ecologicalInformation.description);
    formData.append('type',ecologicalInformation.type);
    formData.append('owner',userId);
    if (imageFile){
        formData.append(imageFile)
    }

    try {
      const response = await apiInstance.post(
        `ecological_informations/`,
        formData
      );
      setSuccessOpen(true);
      setsuccessMsg(t("La creation a réussi!"));
      console.log("Response of create:", response);
      setEcologicalInformation({
        title: "",
        description: "",
        type: "Valorisation",
        owner: null,
      });
      setImageFile(null);
    } catch (error) {
      setToastOpen(true);
      setErrorMsg(t("Creation echouée"));
      console.log("Error creation", error);
    }
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
      <EcologicalInformationDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedEcologicalInformation={ecologicalInformation}
        handleImageUpload={handleImageUpload}
      />
    </>
  );
};

export default EcologicalInformationCreate;