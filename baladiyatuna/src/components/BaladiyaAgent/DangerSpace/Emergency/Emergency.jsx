import React, { useState } from 'react';
import { TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import StateMenuSelect from '../../../Tools/StateMenu';
import DeleteDialog from '../../../Tools/DeleteDialog';
import TableComponent from '../../../Tools/TableComponent';

const StateCell = styled(TableCell)(({ state }) => ({
  height: '80px',
  color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));

const Emergency = ({ emergencies, onEdit, onDelete, onValidate }) => {
  const [selectedEmergencyId, setSelectedEmergencyId] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleClickDelete = (id) => {
    setSelectedEmergencyId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    onDelete(selectedEmergencyId);
    setSelectedEmergencyId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedEmergencyId(null);
    setOpen(false);
  };
  
  const handleSwitchChange = (id, newState) => {
    onValidate(id, newState);
  };

  const columns = [
    { label: t('ID'), dataKey: 'id' },
    { label: t('Titre'), dataKey: 'title' },
    { label: t('Description'), dataKey: 'description' },
    { label: t('Type'), dataKey: 'type' },
    {
        label: 'Public',
        dataKey: 'public',
        render: (item) => (
          item.public ? t('Oui') : t('Non')
        ),
      },
    
    { label: t('Etat'), dataKey: 'state', render: (item) => (
      <StateCell state={item.state}>{item.state}</StateCell>
    ) },
    { label: 'Valider', render: (item) => (
        <StateMenuSelect
          currentState={item.state}
          onChangeState={(newState) => handleSwitchChange(item.id, newState)}
        />
      ) },
    { label: 'Actions', render: (item) => (
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
          onClick={() => handleClickDelete(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ) },
  ];

  return (
    <>
      <TableComponent columns={columns} data={emergencies} />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Emergency;
