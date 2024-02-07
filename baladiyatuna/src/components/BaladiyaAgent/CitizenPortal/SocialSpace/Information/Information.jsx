import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import TableComponent from '../../../../Tools/TableComponent';
import DeleteDialog from '../../../../Tools/DeleteDialog'; 
import { useTranslation } from 'react-i18next';


const Information = ({ informations, onEdit, onDelete }) => {
  const [selectedInformationId, setSelectedInformationId] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(selectedInformationId);
    setSelectedInformationId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedInformationId(null);
    setOpen(false);
  };

  const handleClickDelete = (id) => {
    setSelectedInformationId(id);
    setOpen(true);
  };

  const columns = [
    { label:t('ID'), dataKey: 'id' },
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
          color="danger"
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
        data={informations}
      />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Information;
