import React from 'react';
import { useState } from 'react';
import { Box, Grid, Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import ReusableButton from '../../Tools/SaveButton';
import PrimaryColorText from '../../Tools/Title'

const StudyDetails = ({
  mode,
  handleChange,
  handleCreate,
  handleUpdate,
  modifiedStudy,
}) => {
    const {t} = useTranslation();
    const [date, setDate] = useState(mode === 'update' ? new Date(modifiedStudy.date) : new Date());

  return (
    <Box ml={45} mt={20} mr={45}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PrimaryColorText variant='h5' className='title'>
            {t("Etude")}
          </PrimaryColorText>
        </Grid>
        {mode === 'update' && (
          <Grid item xs={12}>
            <TextField
              name='owner'
              label='Owner'
              fullWidth
              value={modifiedStudy.owner}
              disabled
            />
          </Grid>
        )}
        {mode === 'update' && (
          <Grid item xs={12}>
            <TextField
              name='created_at'
              label='Created At'
              fullWidth
              value={modifiedStudy.created_at}
              disabled
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            name='title'
            label='Title'
            fullWidth
            value={modifiedStudy.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='description'
            label='Description'
            multiline
            fullWidth
            value={modifiedStudy.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} >
              <DateTimePicker
                onChange={setDate}
                value={date}
                format="dd-MM-yyyy HH:mm"
              />
        </Grid>
        <Grid item xs={12}>
          <ReusableButton
            size='large' 
            label={mode === 'update' ? 'Update' : 'Create'}
            onClick={() => (mode === 'update' ? handleUpdate(date) : handleCreate(date))}

          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudyDetails;
