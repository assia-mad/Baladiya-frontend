import React, { useState } from "react";
import apiInstance from "../../../../../API";
import PublicityOfferDetails from "./PublicityOfferDetails";
import ErrorSnackbar from "../../../Tools/ErrorSnackBar";
import SuccessSnackbar from "../../../Tools/SuccessSnackBar";
import { useTranslation } from "react-i18next";

const PublicityOfferCreate = () => {
  const [publicityOffer, setPublicityOffer] = useState({
    wilaya: null,
    commune: null,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicityOffer(prevOffer => ({
      ...prevOffer,
      [name]: value
    }));
  };

  const handleSelectWilaya = (wilaya) => {
    setPublicityOffer(prevOffer => ({
      ...prevOffer,
      wilaya
    }));
  };

  const handleSelectCommune = (commune) => {
    setPublicityOffer(prevOffer => ({
      ...prevOffer,
      commune
    }));
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('wilaya', publicityOffer.wilaya);
    formData.append('commune', publicityOffer.commune);
    formData.append('population', publicityOffer.population);
    formData.append('price', publicityOffer.price);

    try {
      await apiInstance.post("/publicity_offers/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMsg(t("La creation a réussi!"));
      setSuccessOpen(true);
    } catch (error) {
      setErrorMsg(t('Creation echouée'));
      setToastOpen(true);
    }
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
      <PublicityOfferDetails
        mode="create"
        handleChange={handleChange}
        handleCreate={handleCreate}
        modifiedOffer={publicityOffer}
        handleSelectWilaya={handleSelectWilaya}
        handleSelectCommune={handleSelectCommune}
      />
    </>
  );
};

export default PublicityOfferCreate;
