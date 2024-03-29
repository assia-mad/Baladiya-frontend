import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../../Tools/Pagination';
import CreationStep from './CreationStep';
import apiInstance from '../../../../../../API';
import Search from '../../../../Tools/Search';
import Filtering from '../../../../Tools/Filtering';
import NavigateButton from '../../../../Tools/NavigationButton';
import PrimaryColorText from '../../../../Tools/Title';


const CreationSteps = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [creationStepList, setCreationStepList] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('All');
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const userDataString = localStorage.getItem('user');
  const userData = JSON.parse(userDataString);


  useEffect(() => {
    fetchCreationSteps();
  }, [page, searchText, filter, userData.commune]);

  const fetchCreationSteps = async () => {
    try {
      const response = await apiInstance.get(`companies_creation/`, {
        params: {
          page,
          commune : userData.role === 'Admin' ? '' : userData.commune,
          search: searchText,
          type:'Social',
        },
      });
      setCreationStepList(response?.results);
      setTotalPages(response?.total_pages); 
    } catch (error) {
      console.error('Error fetching creation steps', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/creation_steps/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await apiInstance.delete(`companies_creation/${id}/`);
      fetchCreationSteps();
    } catch (error) {
      console.error('Error deleting creation step', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
    setPage(1); 
  };

  return (
    <Box m={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item mt={5}>
          <PrimaryColorText className='title'>
            {t('Guide de Création')}
          </PrimaryColorText>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={10}>
              <NavigateButton page={'/creation_step'} />
            </Box>
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchCreationSteps} />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <CreationStep
            creationSteps={creationStepList}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
        <Grid item>
          <PaginationItem
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreationSteps;
