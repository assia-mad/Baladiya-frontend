import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from '@mui/material';
import { CheckCircle, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavigateButton from '../../../Tools/NavigationButton';
import PaginationItem from '../../../Tools/Pagination';
import Publicity from './Publicity'; 
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';


const Publicities = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [publicities, setPublicities] = useState([]);
  const [filter, setFilter] = useState('Toutes les publicités');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');

  const filterList = [
    { name: t('Toutes les publicités'), value: 'Toutes les publicités' },
    { name: t('En traitement'), value: 'en traitement' },
    { name: t('Validé'), value: 'validé' },
    { name: t('Refusé'), value: 'refusé' },
  ];

  useEffect(() => {
    fetchData();
  }, [filter, page, searchText]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`publicities/`, {
        params: {
          page,
          state: filter === 'Toutes les publicités' ? '' : filter,
          search: searchText,
        },
      });
      setPublicities(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleEdit = (publicityId) => {
    navigate(`/publicities/${publicityId}`);
  };

  const handleDelete = async (publicityId) => {
    try {
      const response = await apiInstance.delete(`publicities/${publicityId}/`);
      fetchData();
    } catch (error) {
      console.log('Failed to delete publicity:', error);
    }
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`publicities/${id}/`, { state });
      setPublicities((prevPublicities) =>
        prevPublicities.map((publicity) =>
          publicity.id === id ? { ...publicity, state } : publicity
        )
      );
    } catch (error) {
      console.log('Failed to change publicity state:', error);
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
          <Typography className="title">{t('Espace publicités')}</Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Filtering
              filter={filter}
              onFilterChange={setFilter}
              filteritems={filterList}
            />
            <Search
              setSearchText={setSearchText}
              searchText={searchText}
              fetchData={fetchData}
            />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <Publicity
            publicities={publicities}
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

export default Publicities;
