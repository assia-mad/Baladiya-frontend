import React, { useState, useEffect } from "react";
import VisitDetails from "./VisitDetails";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../../../API";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";


const VisitDetailsComponent = () => {
  const { id } = useParams();
  const [modifiedVisit, setModifiedVisit] = useState(null);
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
    const fetchVisitData = async () => {
      try {
        const response = await apiInstance.get(`visits/${id}/`);
        setModifiedVisit(response);
        console.log('Response:', response);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchVisitData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedVisit((prevVisit) => ({
      ...prevVisit,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", modifiedVisit.title);
    formData.append("description", modifiedVisit.description);
    formData.append("localisation", modifiedVisit.localisation);
    formData.append("commune", modifiedVisit.commune);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await apiInstance.patch(
        `visits/${modifiedVisit.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setModifiedVisit(response);
      setSuccessMsg(t("Visite modifiée avec succès!"));
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
      const response = await apiInstance.patch(`visits/${id}/`, { state });
      setModifiedVisit((prevVisit) => ({
        ...prevVisit,
        state: newState,
      }));
    } catch (error) {
      console.log('Failed to change visit state:', error);
    }
  };

  if (!modifiedVisit) {
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
      <VisitDetails
        mode="update"
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleImageUpload={handleImageUpload}
        modifiedVisit={modifiedVisit}
        handleSwitchChange={handleSwitchChange}
      />
    </>
  );
};

export default VisitDetailsComponent;
