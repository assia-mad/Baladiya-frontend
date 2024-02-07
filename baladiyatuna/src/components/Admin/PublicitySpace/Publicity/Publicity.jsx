import React, { useState } from 'react';
import { TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StateMenuSelect from '../../../Tools/StateMenu';
import DeleteDialog from '../../../Tools/DeleteDialog';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import TableComponent from '../../../Tools/TableComponent';

const StyledImg = styled('img')({
  width: '80px',
  height: '80px',
});
const StateCell = styled(TableCell)(({ state }) => ({
    height: '80px',
    color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));

const Publicity = ({ publicities, onEdit, onDelete, onValidate }) => {
  const [selectedPublicityId, setSelectedPublicityId] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(selectedPublicityId);
    setSelectedPublicityId(null);
    setOpen(false);
  };

  const handleClickDelete = (e, selectedPublicityId) => {
    setSelectedPublicityId(selectedPublicityId);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedPublicityId(null);
    setOpen(false);
  };

  const handleSwitchChange = (id, newState) => {
    onValidate(id, newState);
  };

  const columns = [
    { label: t('ID'), dataKey: 'id' },
    { label: t('Image'), render: (item) => (
      item.image && (
        <StyledImg src={item.image} alt={t("image_alt")} />
      )
    )},
    { label: t('Lien'), dataKey: 'link' },
    { label: t('Date début'), dataKey: 'start_date' },
    { label: t('Date fin'), dataKey: 'end_date' },
    { label: t('Etat'), dataKey: 'state', render: (item) => (
      <StateCell state={item.state}>{item.state}</StateCell>
    )},
    { label: t('Valider'), render: (item) => (
      <StateMenuSelect
        currentState={item.state}
        onChangeState={(newState) => handleSwitchChange(item.id, newState)}
      />
    )},
    { label: t('Action'), render: (item) => (
      <>
        <IconButton
          color="primary"
          aria-label={t("edit")}
          onClick={() => handleEdit(item.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="danger"
          aria-label={t("delete")}
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
      data={publicities}
    />
    <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Publicity;
