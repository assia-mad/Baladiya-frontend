import React, { useState } from 'react';
import { TableCell, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import TableComponent from '../../../Tools/TableComponent';
import DeleteDialog from '../../../Tools/DeleteDialog';
import algeriaCities from "../../../../../dzData.json";

const CustomTableCell = styled(TableCell)({
  height: '80px',
});

const getCommuneNameById = (communeId) => {
  const commune = algeriaCities.find((city) => city.id === communeId);
  return commune ? commune.commune_name_ascii : '';
};

const getWilayaNameById = (wilayaId) => {
    const wilayaCodeStr = String(wilayaId);
    const wilaya = algeriaCities.find((city) => city.wilaya_code === wilayaCodeStr);
    return wilaya ? wilaya.wilaya_name_ascii : '';
  };
  

const PublicityOffer = ({ offers, onEdit, onDelete }) => {
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(selectedOfferId);
    setSelectedOfferId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedOfferId(null);
    setOpen(false);
  };

  const handleClickDelete = (id) => {
    setSelectedOfferId(id);
    setOpen(true);
  };

  const columns = [
    { label: t('ID'), dataKey: 'id' },
    { label: t('Wilaya'), dataKey: 'wilaya', render: (item) => (
      <Typography>{getWilayaNameById(item.wilaya)}</Typography>
    )},
    { label: t('Commune'), dataKey: 'commune', render: (item) => (
      <Typography>{getCommuneNameById(item.commune)}</Typography>
    )},
    { label: t('Population'), dataKey: 'population', render: (item) => (
      <Typography>{item.population.toLocaleString()}</Typography>
    )},
    { label: t('Price'), dataKey: 'price', render: (item) => (
      <Typography>{item.price.toFixed(2)} DZD</Typography>
    )},
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
          onClick={() => handleClickDelete(item.id)}
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
        data={offers}
      />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default PublicityOffer;
