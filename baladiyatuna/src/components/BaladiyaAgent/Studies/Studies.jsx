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
import Study from './Study'; 
import apiInstance from '../../../../API';
import Search from '../../Tools/Search';
import Filtering from '../../Tools/Filtering';

const Studies = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);
  const [filter, setFilter] = useState('Toutes les études');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [
    { name: t('Toutes les études'), value: 'Toutes les études' },
    { name: t('Crée par Apc'), value: 'Agent' },
    { name: t('Crée par BEDS'), value: 'Admin' },
  ];

  useEffect(() => {
    fetchData();
  }, [filter, page, searchText]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`studies/`, {
        params: {
          page,
          owner__role: filter === 'Toutes les études' ? '' : filter,
          search: searchText,
        },
      });
      setStudies(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleEdit = (studyId) => {
    navigate(`/studies/${studyId}`);
  };

  const handleDelete = async (studyId) => {
    try {
      const response = await apiInstance.delete(`studies/${studyId}/`);
      fetchData();
    } catch (error) {
      console.log('Failed to delete study:', error);
    }
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`studies/${id}/`, { state });
      setStudies((prevStudies) =>
        prevStudies.map((study) =>
          study.id === id ? { ...study, state } : study
        )
      );
    } catch (error) {
      console.log('Failed to change study state:', error);
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
          <Typography className="title">{t('Espace des études')}</Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={10}>
              <NavigateButton page={'/study'} />
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
          <Study
            studies={studies}
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

export default Studies;
