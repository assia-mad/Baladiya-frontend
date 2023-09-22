import React, { useState } from "react";
import { TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import TableComponent from "../../../Tools/TableComponent";
import DeleteDialog from "../../../Tools/DeleteDialog";

const StyledImg = styled('img')({
  width: '80px',
  height: '80px',
});

const EcologicalInformation = ({ ecologicalInformations, onEdit, onDelete }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    onDelete(selectedItemId);
    setSelectedItemId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedItemId(null);
    setOpen(false);
  };

  const handleClickDelete = (e, id) => {
    setSelectedItemId(id);
    setOpen(true);
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
    { label: 'Type', dataKey: 'type' },
    { label: 'Etat', dataKey: 'state' },
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
      <TableComponent columns={columns} data={ecologicalInformations} />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default EcologicalInformation;
