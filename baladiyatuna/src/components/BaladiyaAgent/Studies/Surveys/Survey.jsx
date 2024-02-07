import React, { useState } from 'react';
import { TableCell } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import DeleteDialog from '../../../Tools/DeleteDialog';
import TableComponent from '../../../Tools/TableComponent';

const StyledImg = styled('img')({
  width: '80px',
  height: '80px',
});
const StateCell = styled(TableCell)(({ state }) => ({
  height: '80px',
  color: state === 'en traitement' ? 'blue' : state === 'validé' ? 'green' : 'red',
}));


const Survey = ({ surveys, onEdit, onDelete}) => {
    const [selectedSurveyId, setSelectedSurveyId] = useState(null);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
  
    const handleEdit = (id) => {
      onEdit(id);
    };
  
    const handleDelete = (id) => {
      console.log('theee id', selectedSurveyId);
      onDelete(selectedSurveyId);
      setSelectedSurveyId(null);
      setOpen(false);
    };
  
    const handleClose = () => {
      setSelectedSurveyId(null);
      setOpen(false);
    };
  
    const handleClickDelete = (e, id) => {
      setSelectedSurveyId(id);
      setOpen(true);
    };
  
  
    const columns = [
      { label: t('ID'), dataKey: 'id' },
      { label: t('Title'), dataKey: 'title' },
      { label: t('Description'), dataKey: 'description' },
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
          data={surveys}
        />
        <DeleteDialog open={open} onCancel={handleClose} onConfirm={handleDelete} />
      </>
    );
  };
  
  export default Survey;
  