import React from "react";
import { useTranslation } from 'react-i18next';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DeleteDialog = ({open, onConfirm, onCancel}) => {
  const { t } = useTranslation();

  return (    
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t("Supprimer ce topic ?")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t("Êtes-vous sûr de vouloir supprimer ce topic ?")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {t("Annuler")}
        </Button>
        <Button onClick={onConfirm} color="danger" autoFocus>
          {t("Oui")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
