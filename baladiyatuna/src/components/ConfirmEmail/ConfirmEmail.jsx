import React, {useState} from "react";
import Login from "../Login/Login";
import SuccessSnackbar from '../Tools/SuccessSnackBar';
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";


const ConfirmEmail = () =>{
    const { t } = useTranslation();
    const [isSuccessOpen, setSuccessOpen] = useState(true);

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        else { setSuccessOpen(false)}
      };

    return (
    <>
    <SuccessSnackbar
        open={isSuccessOpen}
        onClose={handleToastClose}
        successMsg={t('Votre email a été correctement confirmé')}
      />
    <Login/> 
    </>
    )
};

export default ConfirmEmail;