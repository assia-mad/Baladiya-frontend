import React, { useState } from 'react';
import { TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StateMenuSelect from '../../Tools/StateMenu';
import DeleteDialog from '../../Tools/DeleteDialog';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import TableComponent from '../../Tools/TableComponent';


const Study = ({ studies, onEdit, onDelete, onValidate }) => {
  const [selectedStudyId, setSelectedStudyId] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleClickDelete = (id) => {
    setSelectedStudyId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    onDelete(selectedStudyId);
    setSelectedStudyId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedStudyId(null);
    setOpen(false);
  };
  
  const handleSwitchChange = (id, newState) => {
    onValidate(id, newState);
  };

  const columns = [
    { label: 'ID', dataKey: 'id' },
    { label: 'Title', dataKey: 'title' },
    { label: 'Description', dataKey: 'description' },
    { label: 'Date', dataKey: 'date' },
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
          onClick={() => handleClickDelete(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ) },
  ];

  return (
    <>
      <TableComponent columns={columns} data={studies} />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Study;
