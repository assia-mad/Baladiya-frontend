import React, { useState } from 'react';
import { TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import StateMenuSelect from '../../../../Tools/StateMenu';
import DeleteDialog from '../../../../Tools/DeleteDialog';
import TableComponent from '../../../../Tools/TableComponent';

const StyledImg = styled('img')({
  width: '80px',
  height: '80px',
});
const StateCell = styled(TableCell)(({ state }) => ({
  height: '80px',
  color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));

const Discussion = ({ discussions, onEdit, onDelete, onValidate }) => {
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    console.log('theee id', selectedDiscussionId);
    onDelete(selectedDiscussionId);
    setSelectedDiscussionId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedDiscussionId(null);
    setOpen(false);
  };

  const handleClickDelete = (e, id) => {
    setSelectedDiscussionId(id);
    setOpen(true);
  };

  const handleSwitchChange = (id, newState) => {
    onValidate(id, newState);
  };

  const columns = [
    { label: 'ID', dataKey: 'id' },
    { label: 'Image', render: (item) => (
      item.image && (
        <StyledImg src={item.image} alt="Discussion Image" />
      )
    )},
    { label: 'Titre', dataKey: 'title' },
    { label: 'Contenu', dataKey: 'description' },
    { label: 'Etat', dataKey: 'state', render: (item) => (
      <StateCell state={item.state}>{item.state}</StateCell>
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
    { label: 'Valider', render: (item) => (
      <StateMenuSelect
        currentState={item.state}
        onChangeState={(newState) => handleSwitchChange(item.id, newState)}
      />
    )},
  ];

  return (
    <>
      <TableComponent
        columns={columns}
        data={discussions}
      />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Discussion;
