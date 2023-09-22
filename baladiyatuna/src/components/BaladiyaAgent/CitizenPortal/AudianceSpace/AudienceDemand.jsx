import React, { useState } from "react";
import { TableCell, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from "@emotion/styled";
import TableComponent from "../../../Tools/TableComponent";
import DeleteDialog from "../../../Tools/DeleteDialog";
import StateMenuSelect from "../../../Tools/StateMenu";

const StateCell = styled(TableCell)(({ state }) => ({
    height: '80px',
    color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
  }));

const AudienceDemand = ({ audienceDemands, onEdit, onDelete }) => {

    const [selectedDemandId, setSelectedDemandId] = useState(null);
    const [open, setOpen] = useState(false);

    const handleEdit = (id) => {
        onEdit(id);
    };

    const handleDelete = (id) => {
        onDelete(selectedDemandId);
        setSelectedDemandId(null);
        setOpen(false);
    };

    const handleClose = () => {
        setSelectedDemandId(null);
        setOpen(false);
    };

    const handleClickDelete = (e, id) => {
        setSelectedDemandId(id);
        setOpen(true);
    };

    const columns = [
        { label: 'ID', dataKey: 'id' },
        { label: 'Titre', dataKey: 'title' },
        { label: 'Description', dataKey: 'description' },
        { label: 'Personne', dataKey: 'person' },
        { label: 'Date', dataKey: 'date' },
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
                data={audienceDemands}
            />
            <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
        </>
    )
}

export default AudienceDemand;
