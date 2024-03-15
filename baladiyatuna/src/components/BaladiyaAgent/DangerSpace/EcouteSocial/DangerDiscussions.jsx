import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar, Select, MenuItem } from '@mui/material';
import { CheckCircle, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../Tools/Pagination';
import DangerDiscussion from './DangerDiscussion';
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';
import PrimaryColorText from '../../../Tools/Title';


const DangerDiscussions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [discussions, setDiscussions] = useState([]); 
  const [filter, setFilter] = useState('Tous les discussions');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const userDataString = localStorage.getItem('user');
  const userData = JSON.parse(userDataString);

  const filterItemslist = [
    { name: 'Tous les discussions', value: 'Tous les discussions' },
    { name: 'En traitement', value: 'en traitement' },
    { name: 'Validé', value: 'validé' },
    { name: 'Refusé', value: 'refusé' },
  ];

  useEffect(() => {
    fetchData();
  }, [filter, page, searchText,userData.commune]);


  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`discussions/`, {
        params: {
          page,
          state: filter === 'Tous les discussions' ? '' : filter,
          type: 'Danger',
          commune: userData.role === 'Admin' ? '' : userData.commune,
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
    navigate(`/danger-discussions/${discussionId}`); 
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

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`discussions/${id}/`, { state });
      setDiscussions((prevDiscussions) =>
        prevDiscussions.map((discussion) =>
          discussion.id === id ? { ...discussion, state } : discussion
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Avatar className="avatar">
          <CheckCircle />
        </Avatar>
        <Grid item>
          <PrimaryColorText className="title">{t('Discussion Politique')}</PrimaryColorText>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist} />
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <DangerDiscussion
            discussions={discussions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onValidate={handleSwitchChange}
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

export default DangerDiscussions;
