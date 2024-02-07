import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TableComponent from '../../../../Tools/TableComponent';
import DeleteDialog from '../../../../Tools/DeleteDialog'; 

const MicroEntrepriseCreation = ({ creationSteps, onEdit, onDelete }) => {
  const [selectedRang, setSelectedRang] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleEdit = (rang) => {
    onEdit(rang);
  };

  const handleDelete = () => {
    onDelete(selectedRang);
    setSelectedRang(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedRang(null);
    setOpen(false);
  };

  const handleClickDelete = (rang) => {
    setSelectedRang(rang);
    setOpen(true);
  };

  const columns = [
    { label: t('Rang'), dataKey: 'rang' },
    { label: t('Titre'), dataKey: 'title' },
    { label: t('Description'), dataKey: 'description' },
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
          color="error" 
          aria-label="delete"
          onClick={() => handleClickDelete(item.id)}
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
        data={creationSteps}
      />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default MicroEntrepriseCreation;
