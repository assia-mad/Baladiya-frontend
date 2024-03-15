import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../Tools/Pagination';
import AudienceDemand from './AudienceDemand';
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';
import NavigateButton from '../../../Tools/NavigationButton';
import PrimaryColorText from '../../../Tools/Title';

const AudienceDemands = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [audienceDemands, setAudienceDemands] = useState([]);
  const [filter, setFilter] = useState('Tous les demandes');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const userDataString = localStorage.getItem('user');
  const userData = JSON.parse(userDataString);

  const filterItemslist = [
    { name: t('Tous les demandes'), value: 'Tous les demandes' },
    { name: t('En traitement'), value: 'en traitement' },
    { name: t('Validé'), value: 'validé' },
    { name: t('Refusé'), value: 'refusé' },
  ];

  useEffect(() => {
    fetchData();
  }, [filter, page, searchText, userData.commune]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`audiance_demands/`, {
        params: {
          page,
          state: filter === 'Tous les demandes' ? '' : filter,
          commune : userData.role === 'Admin' ? '' : userData.commune,
          search: searchText,
        },
      });
      console.log(filter, 'this is the filter');
      setAudienceDemands(response?.results);
      setTotalPages(response?.total_pages);
      console.log('theeeeeeeee', response.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleEdit = (audienceDemandId) => {
    navigate(`/audience_demands/${audienceDemandId}`);
  };

  const handleDelete = async (audienceDemandId) => {
    try {
      const response = await apiInstance.delete(`audiance_demands/${audienceDemandId}/`);
      fetchData();
    } catch (error) {
      console.log('error');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`audiance_demands/${id}/`, { state });
      setAudienceDemands((prevAudienceDemands) =>
        prevAudienceDemands.map((audienceDemand) =>
          audienceDemand.id === id ? { ...audienceDemand, state } : audienceDemand
        )
      );
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <Box m={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Avatar className="avatar">
          <CheckCircle />
        </Avatar>
        <Grid item>
          <PrimaryColorText className='title'>
            {t('Demandes audience')}
          </PrimaryColorText>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <NavigateButton page={'/audience_demand'}/>
            <Box ml={10}>
            <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist} />
            </Box>
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Grid>
        <Grid item className='table-container'>
          <AudienceDemand
            audienceDemands={audienceDemands}
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

export default AudienceDemands;
