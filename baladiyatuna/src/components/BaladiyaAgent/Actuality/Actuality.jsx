import React, { useState } from "react";
import { TableCell, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from "@emotion/styled";
import TableComponent from "../../Tools/TableComponent";
import DeleteDialog from "../../Tools/DeleteDialog";
import StateMenuSelect from "../../Tools/StateMenu";

const StyledImg = styled('img')({
  width: '80px',
  height: '80px',
});

const StyledVideo = styled('video')({
  width: '80px',
  height: '80px',
});
const StateCell = styled(TableCell)(({ state }) => ({
  height: '80px',
  color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));

const Actuality = ({ actualities, onEdit, onDelete, onValidate }) => {
  const [selectedActualityId, setSelectedActualityId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(selectedActualityId);
    setSelectedActualityId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedActualityId(null);
    setOpen(false);
  };

  const handleClickDelete = (e, id) => {
    setSelectedActualityId(id);
    setOpen(true);
  };
  const handleSwitchChange = (id, newState) => {
    onValidate(id, newState);
  };

  const renderFile = (item) => {
    if (item.file) {
      const fileExtension = item.file.split('.').pop().toLowerCase();
      if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
        return <StyledImg src={item.file} alt="Actuality Image" />;
      } else if (fileExtension === 'mp4' || fileExtension === 'avi' || fileExtension === 'mov') {
        return <StyledVideo controls><source src={item.file} type="video/mp4" /></StyledVideo>;
      }
    }
    return null;
  };

  const columns = [
    { label: 'ID', dataKey: 'id' },
    {
      label: 'File',
      render: (item) => renderFile(item),
    },
    { label: 'Titre', dataKey: 'title' },
    { label: 'Description', dataKey: 'description' },
    { label: 'Date', dataKey: 'date' },
    { label: 'Type', dataKey: 'type' },
    { label: 'Etat', dataKey: 'state', render: (item) => (
        <StateCell state={item.state}>{item.state}</StateCell>
      )},
    { label: 'Valider', render: (item) => (
        <StateMenuSelect
          currentState={item.state}
          onChangeState={(newState) => handleSwitchChange(item.id, newState)}
        />
      )},
    {
      label: 'Action',
      render: (item) => (
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
      ),
    },
  ];

  return (
    <>
      <TableComponent columns={columns} data={actualities} />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Actuality;
