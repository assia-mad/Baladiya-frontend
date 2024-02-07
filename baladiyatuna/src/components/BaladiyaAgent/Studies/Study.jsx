import React, { useState } from 'react';
import { TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import DeleteDialog from '../../Tools/DeleteDialog';
import TableComponent from '../../Tools/TableComponent';


const Study = ({ studies, onEdit, onDelete}) => {
  const [selectedStudyId, setSelectedStudyId] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    console.log('theee id', selectedStudyId);
    onDelete(selectedStudyId);
    setSelectedStudyId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedStudyId(null);
    setOpen(false);
  };

  const handleClickDelete = (e, id) => {
    setSelectedStudyId(id);
    setOpen(true);
  };

  const handleSwitchChange = (id, newState) => {
    onValidate(id, newState);
  };

  const columns = [
    { label: t('ID'), dataKey: 'id' },
    { label: t('Title'), dataKey: 'title' },
    { label: t('Content'), dataKey: 'description' },
    { label: t('Date'), dataKey: 'date' },
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
        data={studies}
      />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Study;
