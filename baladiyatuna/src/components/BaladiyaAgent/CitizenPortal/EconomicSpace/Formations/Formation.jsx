import React from 'react';
import { TableCell, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import DeleteDialog from '../../../../Tools/DeleteDialog';
import TableComponent from '../../../../Tools/TableComponent';



const EconomicFormation = ({ formations, onEdit, onDelete}) => {
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    onDelete(selectedFormationId);
    setSelectedFormationId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedFormationId(null);
    setOpen(false);
  };

  const handleClickDelete = (e, id) => {
    setSelectedFormationId(id);
    setOpen(true);
  };


  const columns = [
    { label: 'ID', dataKey: 'id' },
    { label: 'Titre', dataKey: 'title' },
    { label: 'Description', dataKey: 'description' },
    { label: 'Lieu et Date', render: (item) => (
      <>
        <Typography>{item.date}</Typography>
        <Typography>{item.localisation}</Typography>
      </>
    )},
    { label: 'Action', render: (item) => (
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
          onClick={(e) => handleClickDelete(e, item.id)}
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
        data={formations}
      />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default EconomicFormation;
