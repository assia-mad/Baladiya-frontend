import React from "react";
import { useState } from "react";
import { TableCell, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from "@emotion/styled";
import TableComponent from "../../../../Tools/TableComponent";
import DeleteDialog from "../../../../Tools/DeleteDialog";
import StateMenuSelect from "../../../../Tools/StateMenu";


const Activity = ({activities, onEdit, onDelete}) => {

    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [open, setOpen] = useState(false);
  
    const handleEdit = (id) => {
      onEdit(id);
    };
  
    const handleDelete = (id) => {
      onDelete(selectedActivityId);
      setSelectedActivityId(null);
      setOpen(false);
    };
  
    const handleClose = () => {
      setSelectedActivityId(null);
      setOpen(false);
    };
  
    const handleClickDelete = (e,id) => {
      setSelectedActivityId(id);
      setOpen(true);
    };


    const columns = [
        { label: 'ID', dataKey: 'id' },
        { label: 'Titre', dataKey: 'title' },
        { label: 'Description', dataKey: 'description' },
        { label: 'Dérigé par', dataKey: 'directed_by' },
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
              onClick={(e) => handleClickDelete(e,item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )},
      ];
  
    return(
        <>
        <TableComponent
        columns={columns}
        data={activities}
        />
        <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
        </>
    )


}

export default Activity;