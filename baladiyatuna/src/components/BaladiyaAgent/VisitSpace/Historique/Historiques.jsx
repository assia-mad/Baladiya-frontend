import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../Tools/Pagination';
import Historique from './Historique';  
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';
import NavigateButton from '../../../Tools/NavigationButton';
import PrimaryColorText from '../../../Tools/Title';


const Historiques = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [historiques, setHistoriques] = useState([]);
  const [filter, setFilter] = useState('Tous les historiques');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [
    { name: t('Tous les historiques'), value: 'Tous les historiques' },
    { name: t('En traitement'), value: 'en traitement' },
    { name: t('Validé'), value: 'validé' },
    { name: t('Refusé'), value: 'refusé' },
  ];

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`history/`, {
        params: {
          page,
          state: filter === 'Tous les historiques' ? '' : filter,
          search: searchText,
        },
      });
      setHistoriques(response?.results);
      console.log('hiiiiiiiiiiiiiiiistooooriquuuuuuues',response);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('Error fetching historiques', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, page, searchText]);



  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleEdit = (historiqueId) => {
    navigate(`/historiques/${historiqueId}`);
  };

  const handleDelete = async (historiqueId) => {
    try {
      const response = await apiInstance.delete(`historiques/${historiqueId}/`);
      fetchData();
    } catch (error) {
      console.log('Error deleting historique', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`historiques/${id}/`, { state });
      setHistoriques((prevhistoriques) =>
      prevhistoriques.map((historique) =>
            historique.id === id ? { ...historique, state } : historique
        )
      );
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <Box m={3} mt={10}>
      <Grid container direction="column" alignItems="center" spacing={2}>
    
        <Grid item>
          <PrimaryColorText className="title">{t('Historiques')}</PrimaryColorText>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={10}>
              <NavigateButton page={'/historique'} />
            </Box>
            <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist} />
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Grid>
        <Grid item className="table-container">
        <Historique
            historiques={historiques}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onValidate={handleSwitchChange}  
            />
        </Grid>
        <Grid item>
          <PaginationItem page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Historiques;
