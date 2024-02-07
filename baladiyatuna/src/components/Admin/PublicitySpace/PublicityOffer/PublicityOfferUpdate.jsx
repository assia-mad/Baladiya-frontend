import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../../../../API";
import PublicityOfferDetails from "./PublicityOfferDetails";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const PublicityOfferUpdate = () => {
  const { id } = useParams();
  const [modifiedOffer, setModifiedOffer] = useState({
    wilaya: '',
    commune: '',
    population: '',
    price: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const { t } = useTranslation();

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setToastOpen(false);
    setSuccessOpen(false);
  };

  const handleSelectWilaya = (wilaya) => {
    setModifiedOffer(prevOffer => ({
      ...prevOffer,
      wilaya
    }));
  };

  const handleSelectCommune = (commune) => {
    setModifiedOffer(prevOffer => ({
      ...prevOffer,
      commune
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedOffer(prevOffer => ({
      ...prevOffer,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await apiInstance.patch(`/publicity_offers/${id}/`, modifiedOffer);
      setModifiedOffer(response);
      setSuccessMsg(t('La modification a réussi!'));
      setSuccessOpen(true);
    } catch (error) {
      setErrorMsg(t('Modification échouée'));
      setToastOpen(true);
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`/publicity_offers/${id}/`);
      setModifiedOffer(response); 
    } catch (error) {
      setErrorMsg(t('Erreur lors de la récupération des données'));
      setToastOpen(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <ErrorSnackbar open={isToastOpen} onClose={handleToastClose} errorMsg={errorMsg} />
      <SuccessSnackbar open={isSuccessOpen} onClose={handleToastClose} successMsg={successMsg} />
      <PublicityOfferDetails
        mode="update"
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        modifiedOffer={modifiedOffer}
        handleSelectCommune={handleSelectCommune}
        handleSelectWilaya={handleSelectWilaya}
      />
    </>
  );
};

export default PublicityOfferUpdate;
