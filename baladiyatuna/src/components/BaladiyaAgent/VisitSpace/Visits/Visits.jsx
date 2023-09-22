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
import Visit from './Visit'; 
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';
import './Visit.css'

const Visits = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visits, setVisits] = useState([]);
  const [filter, setFilter] = useState('Toutes les visites');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [ {name:t("Toutes les visites"), value:"Toutes les visites"},
                            {name:t("En traitement"), value:"en traitement"},
                            {name:t("Validé"), value:"validé"},
                            {name:t("Refusé"), value:"refusé"},
                              ]

  useEffect(() => {
    fetchData();
  }, [filter, page, searchText]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`visits/`, {
        params: {
          page,
          state: filter === 'Toutes les visites' ? '' : filter,
          search: searchText,
        },
      });
      setVisits(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleEdit = (visitId) => {
    navigate(`/visits/${visitId}`);
  };

  const handleDelete = async (visitId) => {
    try {
      const response = await apiInstance.delete(`visits/${visitId}/`);
      fetchData();
    } catch (error) {
      console.log('Failed to delete visit:', error);
    }
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`visits/${id}/`, { state });
      setVisits((prevVisits) =>
        prevVisits.map((visit) =>
          visit.id === id ? { ...visit, state } : visit
        )
      );
    } catch (error) {
      console.log('Failed to change visit state:', error);
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
          <Typography className="title">{t('Espace visite')}</Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={10}>
              <NavigateButton page={'/visit'} />
            </Box>
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
          <Visit
            visits={visits}
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

export default Visits;
