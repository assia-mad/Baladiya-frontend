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
import Emergency from './Emergency';  
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';
import NavigateButton from '../../../Tools/NavigationButton';

const Emergencies = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [emergencies, setEmergencies] = useState([]);
  const [filterType, setFilterType] = useState('Tous les types');
  const [filterPublic, setFilterPublic] = useState('Publique');
  const [filter, setFilter] = useState('Tous les urgences');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterTypeList = [
    { name: t('Tous les types'), value: 'Tous les types' },
    { name: t('Gaz'), value: 'Gaz' },
    { name: t('Incendie'), value: 'Incendie' },
  ];
  const filterPublicList = [
    { name: t('Publique'), value: 'Publique' },
    { name: t('True'), value: true },
    { name: t('False'), value: false },
  ];
  const filterItemslist = [
    { name: t('Tous les urgences'), value: 'Tous les urgences' },
    { name: t('En traitement'), value: 'en traitement' },
    { name: t('Validé'), value: 'validé' },
    { name: t('Refusé'), value: 'refusé' },
  ];

  useEffect(() => {
    fetchData();
  }, [filterType, filterPublic, page, searchText]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`emergencies/`, {
        params: {
          page,
          type: filterType === 'Tous les types' ? '' : filterType,
          public: filterPublic === 'Publique' ? '' : filterPublic,
          state: filter === 'Tous les urgences'? '':filter,
          search: searchText,
        },
      });
      setEmergencies(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFilterTypeChange = (newValue) => {
    setFilterType(newValue);
  };

  const handleFilterPublicChange = (newValue) => {
    setFilterPublic(newValue);
  };
  const handleFilterStatecChange = (newValue) => {
    setFilter(newValue);
  };

  const handleEdit = (emergencyId) => {
    navigate(`/emergencies/${emergencyId}`);
  };

  const handleDelete = async (emergencyId) => {
    try {
      await apiInstance.delete(`emergencies/${emergencyId}/`);
      fetchData();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`emergencies/${id}/`, { state });
      setEmergencies((prevEmergencies) =>
        prevEmergencies.map((emergency) =>
          emergency.id === id ? { ...emergency, state } : emergency
        )
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Box m={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Avatar className="avatar">
          <CheckCircle />
        </Avatar>
        <Grid item>
          <Typography className='title'>
            {t('Emergencies')}
          </Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <NavigateButton page={'/emergency'} />
            <Box ml={10}>
              <Filtering
                filter={filterType}
                onFilterChange={handleFilterTypeChange}
                filteritems={filterTypeList}
              />
              <Filtering
                filter={filterPublic}
                onFilterChange={handleFilterPublicChange}
                filteritems={filterPublicList}
              />
              <Filtering
                filter={filter}
                onFilterChange={handleFilterStatecChange}
                filteritems={filterItemslist}
              />
            </Box>
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Grid>
        <Grid item className='table-container'>
          <Emergency
            emergencies={emergencies}
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

export default Emergencies;
