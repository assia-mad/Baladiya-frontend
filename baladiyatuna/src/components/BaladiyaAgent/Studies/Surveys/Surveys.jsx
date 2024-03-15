import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../Tools/Pagination';
import Survey from './Survey';
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';
import PrimaryColorText from '../../../Tools/Title';
import NavigateButton from '../../../Tools/NavigationButton';

const Surveys = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [filter, setFilter] = useState('Tous les sondages');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const userDataString = localStorage.getItem('user');
  const userData = JSON.parse(userDataString);

  const filterItemslist = [
    { name: t('Tous les sondages'), value: 'Tous les sondages' },
    { name: t('Crée par Apc'), value: 'Agent' },
    { name: t('Crée par BEDS'), value: 'Admin' },
  ];


  useEffect(() => {
    fetchData();
  }, [filter, page, searchText, userData.commune]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`surveys/`, {
        params: {
          page,
          owner__role: filter === 'Tous les sondages' ? '' : filter,
          commune : userData.role === 'Admin' ? '' : userData.commune,
          search: searchText,
        },
      });
      setSurveys(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleEdit = (surveyId) => {
    navigate(`/surveys/${surveyId}`);
  };

  const handleDelete = async (surveyId) => {
    try {
      const response = await apiInstance.delete(`surveys/${surveyId}/`);
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
        <Grid item>
          <PrimaryColorText className="title">{t('Sondages')}</PrimaryColorText>
        </Grid>
        <Grid item>
            <Box display="flex" alignItems="center" mb={2}>
                <Box mr={10}>
                    <NavigateButton page={'/survey'} />
                </Box>
                <Filtering filter={filter} onFilterChange={handleFilterChange}  filteritems={filterItemslist} />
                <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
            </Box>
        </Grid>
        <Grid item className="table-container">
          <Survey
            surveys={surveys}
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

export default Surveys;
