import React, { useState } from 'react';
import { TableCell, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
import StateMenuSelect from '../../../Tools/StateMenu';
import DeleteDialog from '../../../Tools/DeleteDialog';
import TableComponent from '../../../Tools/TableComponent';



const StyledImg = styled('img')({
  width: '80px',
  height: '80px',
});

const Product = ({ products, onEdit, onDelete, onActivate }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    onDelete(selectedProductId);
    setSelectedProductId(null);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedProductId(null);
    setOpen(false);
  };

  const handleClickDelete = (e, id) => {
    setSelectedProductId(id);
    setOpen(true);
  };

  const handleActivateChange = (id, newState) => {
    onActivate(id, newState);
  };

  const columns = [
    { label: 'ID', dataKey: 'id' },
    {
      label: 'Image',
      render: (item) =>
        item.image && <StyledImg src={item.image} alt="Product Image" />,
    },
    { label: 'Name', dataKey: 'name' },
    { label: 'Description', dataKey: 'description' },
    { label: 'Price', dataKey: 'price' },
    { label: 'Type', dataKey: 'action_type' },
    {
      label: 'Action',
      render: (item) => (
        <>
          <IconButton color="primary" aria-label="edit" onClick={() => handleEdit(item.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" aria-label="delete" onClick={(e) => handleClickDelete(e, item.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <TableComponent columns={columns} data={products} />
      <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
};

export default Product;
