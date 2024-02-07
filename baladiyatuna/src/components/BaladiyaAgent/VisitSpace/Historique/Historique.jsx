import React from 'react';
import { TableCell, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StateMenuSelect from '../../../Tools/StateMenu';
import DeleteDialog from '../../../Tools/DeleteDialog';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import TableComponent from '../../../Tools/TableComponent';


const StateCell = styled(TableCell)(({ state }) => ({
  height: '80px',
  color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));

const Historique = ({ historiques, onEdit, onDelete, onValidate }) => {
  const [selectedHistoriqueId, setSelectedHistoriqueId] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    onDelete(selectedHistoriqueId);
    setSelectedHistoriqueId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedHistoriqueId(null);
    setOpen(false);
  };

  const handleClickDelete = (e,id) => {
    setSelectedHistoriqueId(id);
    setOpen(true);
  };

  const handleSwitchChange = (id, newState) => {
    onValidate(id, newState);
  };

  const columns = [
    { label: t('Evenement'), dataKey: 'event' },
    { label: t('Date'), dataKey: 'date', render: (item) => (
      <Typography>{item.date}</Typography>
    )},
    { label: t('Etat'), dataKey: 'state', render: (item) => (
      <StateCell state={item.state}>{item.state}</StateCell>
    )},
    { label: t('Valider'), render: (item) => (
      <StateMenuSelect
        currentState={item.state}
        onChangeState={(newState) => handleSwitchChange(item.id, newState)}
      />
    )},
    { label: t('Action'), render: (item) => (
      <>
        <IconButton
          color="primary"
          aria-label="edit"
          onClick={() => handleEdit(item.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="danger"
          aria-label="delete"
          onClick={(e) => handleClickDelete(e,item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    )},
  ];

  return (
    <>
    <TableComponent
      columns={columns}
      data={historiques}
    />
    <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Historique;
