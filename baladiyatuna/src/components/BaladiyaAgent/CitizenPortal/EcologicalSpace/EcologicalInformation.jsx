import React, { useState } from "react";
import {  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Grid,
  useMediaQuery,
  Box,
  TableCell,
IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import TableComponent from "../../../Tools/TableComponent";
import DeleteDialog from "../../../Tools/DeleteDialog";
import StateMenuSelect from "../../../Tools/StateMenu";

const StyledImg = styled('img')({
  width: '80px',
  height: '80px',
});
const StateCell = styled(TableCell)(({ state }) => ({
  height: '80px',
  color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));
const EcologicalInformation = ({ ecologicalInformations, onEdit, onDelete,onValidate, userRole }) => {
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

  const handleClickDelete = (id) => {
    setSelectedItemId(id);
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
    { label: 'Type', dataKey: 'type' },
    { label: 'Etat', dataKey: 'state', render: (item) => (
      <StateCell state={item.state}>{item.state}</StateCell>
    ) },
    { label: 'Valider', render: (item) => (
      <StateMenuSelect
        currentState={item.state}
        onChangeState={(newState) => handleSwitchChange(item.id, newState)}
      />
    ) },
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
const isAdmin = userRole === "Admin";

return (
  <>
    {isAdmin ? (
   
    <Grid container spacing={2} justifyContent="center" alignItems="stretch">
      {ecologicalInformations.map((ecologicalInformation) => (
        <Grid item key={ecologicalInformation.id} xs={12} sm={6} md={6}>
          <Card style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <Grid container>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  alt={ecologicalInformation.title}
                  height="140"
                  image={ecologicalInformation.image}
                />
              </Grid>
              <Grid item xs={8}>
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {ecologicalInformation.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {ecologicalInformation.description}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2" color="textSecondary">
                      Type: <Typography variant="body2" component="span" fontWeight="bold" color="secondary">{ecologicalInformation.type}</Typography> | 
                      State: <Typography variant="body2" component="span" fontWeight="bold" color="secondary">{ecologicalInformation.state}</Typography>
                    </Typography>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
    ) : (
      <>
        <TableComponent columns={columns} data={ecologicalInformations} />
      </>
    )}
    <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
  </>
);




  
};

export default EcologicalInformation;
