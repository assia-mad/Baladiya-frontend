import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { CheckCircle, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavigateButton from '../../Tools/NavigationButton';
import PaginationItem from '../../Tools/Pagination';
import Danger from './Danger';
import apiInstance from '../../../../API';
import Search from '../../Tools/Search';
import Filtering from '../../Tools/Filtering';


const Dangers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dangers, setDangers] = useState([]);
  const [filter, setFilter] = useState('Tous les risques');
  const [typeFilter, setTypeFilter] = useState('Tous les risques');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [
    { name: t('Tous les risques'), value: 'Tous les risques' },
    { name: t('En traitement'), value: 'en traitement' },
    { name: t('Validé'), value: 'validé' },
    { name: t('Refusé'), value: 'refusé' },
  ];
  const typeFilterList = [
    { name: t('Tous les risques'), value: 'Tous les risques' },
    { name: t('Information'), value: 'Information' },
    { name: t('Alerte'), value: 'Alerte' },
  ];

  useEffect(() => {
    fetchData();
  }, [typeFilter,filter, page, searchText]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`danger_informations/`, {
        params: {
          page,
          state: filter === 'Tous les risques' ? '' : filter,
          type: typeFilter === 'Tous les risques' ? '' : typeFilter,
          search: searchText,
        },
      });
      setDangers(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleEdit = (dangerId) => {
    navigate(`/danger_informations/${dangerId}`);
  };

  const handleDelete = async (dangerId) => {
    try {
      const response = await apiInstance.delete(`danger_informations/${dangerId}/`);
      fetchData();
    } catch (error) {
      console.log('Failed to delete danger:', error);
    }
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`danger_informations/${id}/`, { state });
      setDangers((prevDangers) =>
        prevDangers.map((danger) =>
          danger.id === id ? { ...danger, state } : danger
        )
      );
    } catch (error) {
      console.log('Failed to change danger state:', error);
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
          <Typography className="title">{t('Espace des risques')}</Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={10}>
              <NavigateButton page={'/danger'} />
            </Box>
            <Filtering
              filter={typeFilter}
              onFilterChange={setTypeFilter}
              filteritems={typeFilterList}
            />
            <Filtering
              filter={filter}
              onFilterChange={setFilter}
              filteritems={filterItemslist}
            />
            <Search
              setSearchText={setSearchText}
              searchText={searchText}
              fetchData={fetchData}
            />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <Danger
            dangers={dangers}
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

export default Dangers;

