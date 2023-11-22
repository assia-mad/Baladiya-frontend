import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar, Select, MenuItem } from '@mui/material';
import { CheckCircle, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LocalPatronat from './LocalPatronat';
import PaginationItem from '../../../../Tools/Pagination';
import apiInstance from '../../../../../../API';
import Search from '../../../../Tools/Search';
import Filtering from '../../../../Tools/Filtering';
import NavigateButton from '../../../../Tools/NavigationButton';

const LocalPatronats = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [discussions, setDiscussions] = useState([]); 
  const [filter, setFilter] = useState('Tous les utilisateurs');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [
    { name: t('Tous les utilisateurs'), value: 'Tous les utilisateurs' },
    { name: t('APC'), value: 'Agent' },
    { name: t('Admin'), value: 'Admin' },
    { name: t('Entrepreneur'), value: 'Entrepreneur' },
  ];

  useEffect(() => {
    fetchData();
  }, [filter, page, searchText]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`discussions/`, {
        params: {
          page,
          state: filter === 'Tous les utilisateurs' ? '' : filter,
          type: 'Economique',
          search: searchText,
        },
      });
      setDiscussions(response?.results); 
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleEdit = (discussionId) => {
    navigate(`/local_patronats/${discussionId}`); 
  };

  const handleDelete = async (discussionId) => {
    try {
      const response = await apiInstance.delete(`discussions/${discussionId}/`);
      fetchData();
    } catch (error) {
      console.log('failed to delete');
      console.log(error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  return (
    <Box m={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Avatar className="avatar">
          <CheckCircle />
        </Avatar>
        <Grid item>
          <Typography className="title">{t('Patronat Local')}</Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
             <Box mr={10}>
                <NavigateButton page={'/local_patronat'}/>
              </Box>
            <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist} />
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <LocalPatronat
            discussions={discussions}
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

export default LocalPatronats;
