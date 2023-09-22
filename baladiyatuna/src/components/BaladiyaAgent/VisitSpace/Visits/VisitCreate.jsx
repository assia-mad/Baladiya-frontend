import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import VisitDetails from "./VisitDetails";
import apiInstance from "../../../../../API";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";


const VisitCreate = () => {
  const [visit, setVisit] = useState({
    title: "",
    description: "",
    localisation: "",
    commune: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState(null);
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
    formData.append("title", visit.title);
    formData.append("description", visit.description);
    formData.append("localisation", visit.localisation);
    formData.append("commune", visit.commune);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await apiInstance.post(`visits/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessOpen(true);
      setSuccessMsg(t("La creation a réussi!"));
    } catch (error) {
      console.log(error);
      setErrorMsg(t("Creation echouée"));
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisit((prevVisit) => ({
      ...prevVisit,
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
      <VisitDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        handleImageUpload={handleImageUpload}
        modifiedVisit={visit}
      />
    </>
  );
};

export default VisitCreate;
