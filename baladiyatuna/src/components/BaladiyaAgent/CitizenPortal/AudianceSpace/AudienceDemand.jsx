import React, { useState, useEffect } from "react";
import { TableCell, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import TableComponent from "../../../Tools/TableComponent";
import DeleteDialog from "../../../Tools/DeleteDialog";
import StateMenuSelect from "../../../Tools/StateMenu";
import apiInstance from "../../../../../API";

const StateCell = styled(TableCell)(({ state }) => ({
    height: '80px',
    color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));

const AudienceDemand = ({ audienceDemands, onEdit, onDelete, onValidate }) => {
    const [ownerDetails, setOwnerDetails] = useState({});
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchOwnerDetails = async () => {
            try {
                const ownerDetailsPromises = audienceDemands.map(demand => 
                    apiInstance.get(`/manage_users/${demand.owner}/`)
                );
                const ownersResponses = await Promise.all(ownerDetailsPromises);
                const newOwnerDetails = ownersResponses.reduce((acc, response, index) => {
                    const ownerData = response;
                    acc[audienceDemands[index].owner] = `${ownerData.first_name} ${ownerData.last_name}`;
                    return acc;
                }, {});
                setOwnerDetails(newOwnerDetails);
            } catch (error) {
                console.error("Error fetching owner details:", error);
            }
        };

        if (audienceDemands && audienceDemands.length > 0) {
            fetchOwnerDetails();
        }
    }, [audienceDemands]);

    const handleEdit = (id) => {
        onEdit(id);
    };

    const handleDelete = () => {
        onDelete(selectedDemandId);
        handleClose();
    };

    const handleClose = () => {
        setSelectedDemandId(null);
        setOpen(false);
    };

    const handleClickDelete = (id) => {
        setSelectedDemandId(id);
        setOpen(true);
    };

    const handleSwitchChange = (id, newState) => {
        onValidate(id, newState);
    };

    const columns = [
        { label: t('ID'), dataKey: 'id' },
        { 
            label: t('Propriétaire'), 
            dataKey: 'owner', 
            render: (item) => ownerDetails[item.owner] || 'Loading...'
        },
        { 
            label: t('Person'), 
            dataKey: 'person'
        },
        { label: t('Type de Rencontre'), dataKey: 'meet_type' },
        { label: t('Date'), dataKey: 'date' },
        { 
            label: t('Etat'), 
            dataKey: 'state', 
            render: (item) => <StateCell state={item.state}>{item.state}</StateCell>
        },
        { 
            label: t('Valider'), 
            render: (item) => (
                <StateMenuSelect
                    currentState={item.state}
                    onChangeState={(newState) => handleSwitchChange(item.id, newState)}
                />
            )
        },
        { 
            label: t('Action'), 
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
                        onClick={() => handleClickDelete(item.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    return (
        <>
            <TableComponent
                columns={columns}
                data={audienceDemands}
            />
            <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
        </>
    );
}

export default AudienceDemand;
