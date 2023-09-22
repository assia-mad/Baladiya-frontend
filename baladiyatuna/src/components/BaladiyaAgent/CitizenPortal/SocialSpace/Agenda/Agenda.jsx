import React from 'react';
import { TableCell, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StateMenuSelect from '../../../../Tools/StateMenu';
import DeleteDialog from '../../../../Tools/DeleteDialog';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import TableComponent from '../../../../Tools/TableComponent';

const StateCell = styled(TableCell)(({ state }) => ({
  height: '80px',
  color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));
const StyledImg = styled('img')({
    width: '80px',
    height: '80px',
  });

const Agenda = ({ agendas, onEdit, onDelete, onValidate }) => {
  const [selectedAgendaId, setSelectedAgendaId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    onDelete(selectedAgendaId);
    setSelectedAgendaId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedAgendaId(null);
    setOpen(false);
  };

  const handleClickDelete = (e,id) => {
    setSelectedAgendaId(id);
    setOpen(true);
  };

  const handleSwitchChange = (id, newState) => {
    onValidate(id, newState);
  };

  const columns = [
    { label: 'ID', dataKey: 'id' },
    { label: 'Image', render: (item) => (
        item.image && (
          <StyledImg src={item.image} alt="Topic Image" />
        )
      )},
    { label: 'Titre', dataKey: 'title' },
    { label: 'Description', dataKey: 'description' },
    { label: 'Lieu et Date', render: (item) => (
      <>
        <Typography>{item.date}</Typography>
        <Typography>{item.localisation}</Typography>
      </>
    )},
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
          onClick={(e) => handleClickDelete(e,item.id)}
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
      data={agendas}
    />
    <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Agenda;
