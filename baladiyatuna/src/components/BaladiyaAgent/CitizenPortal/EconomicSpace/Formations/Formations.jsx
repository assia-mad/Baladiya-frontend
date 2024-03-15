import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { CheckCircle} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../../Tools/Pagination';
import Formation from './Formation';
import apiInstance from '../../../../../../API';
import Search from '../../../../Tools/Search';
import Filtering from '../../../../Tools/Filtering';
import NavigateButton from '../../../../Tools/NavigationButton';
import PrimaryColorText from '../../../../Tools/Title';

const EconomicFormations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formations, setFormations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState("Tous les utilisateurs");
  const userDataString = localStorage.getItem('user');
  const userData = JSON.parse(userDataString);

  const filterItemslist = [ {name:t("Tous les utilisateurs"), value:"Tous les utilisateurs"},
                            {name:t("APC"), value:"Agent"},
                            {name:t("Admin"), value:"Admin"},
                         ]

  useEffect(() => {
    fetchData();
  }, [page, searchText,filter, userData.commune]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get('formations/', {
        params: {
          page,
          commune : userData.role === 'Admin' ? '' : userData.commune,
          type: 'Economique',
          owner__role : filter === "Tous les utilisateurs" ? '':filter,
          search: searchText,
        },
      });

      setFormations(response?.results);
      setTotalPages(response?.total_pages);

    } catch (error) {
      console.log('error', error);
    }
  };

  const handleEdit = (formationId) => {
    navigate(`/economic_formations/${formationId}`);
  };
  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleDelete = async (formationId) => {
    try {
      const response = await apiInstance.delete(`formations/${formationId}/`);
      fetchData();
    } catch (error) {
      console.log('error');
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
          <PrimaryColorText className="title">{t('Economique Formations')}</PrimaryColorText>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
              <Box mr={10}>
                <NavigateButton page={'/economic_formation'}/>
              </Box>
            <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist}/>
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <Formation formations={formations} onEdit={handleEdit} onDelete={handleDelete} />
        </Grid>
        <Grid item>
          <PaginationItem page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EconomicFormations;
