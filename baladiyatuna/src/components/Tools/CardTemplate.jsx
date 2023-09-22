import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StateMenuSelect from './StateMenu';
import DeleteDialog from './DeleteDialog';

const CardItem = ({ item, onDelete, onEdit, onValidate }) => {
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const cardStyle = {
    width: '250px',
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const cardImageStyle = {
    flex: '1', 
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  };

  const cardContentStyle = {
    padding: '16px',
  };

  const cardActionsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', 
    padding: '8px',
    marginBottom: '5px'
  };

  const iconButtonStyle = {
    flex: 'none', 
  };

  const handleSwitchChange = (id, newState) => {
    onValidate(id, newState);
  };
  const handleDelete = (id) => {
    console.log('theee id', selectedItemId);
    onDelete(selectedItemId);
    setSelectedItemId(null);
    setOpen(false);
  };
  const handleClose = () => {
    setSelectedItemId(null);
    setOpen(false);
  };

  const handleClickDelete = (id) => {
    setSelectedItemId(id);
    setOpen(true);
  };

  return (
    <>
    <Card style={cardStyle}>
      <Typography variant="h6" style={{ marginBottom: '0px',fontSize: '17px',fontFamily: 'sans-serif'}}>
        {item.name}
      </Typography>
      <img src={item.image} alt={item.title} style={cardImageStyle} />
      <CardContent style={cardContentStyle}>
        <Typography variant="h6">{item.title}</Typography>
      </CardContent>
      <CardActions style={cardActionsStyle}>
        <StateMenuSelect
          currentState={item.state}
          onChangeState={(newState) => handleSwitchChange(item.id, newState)}
        />
        <IconButton
          color="primary"
          aria-label="edit"
          onClick={() => onEdit(item.id)}
          style={iconButtonStyle}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="danger"
          aria-label="delete"
          onClick={() => handleClickDelete(item.id)}
          style={iconButtonStyle}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
    <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
    </>
  );
}

export default CardItem;
