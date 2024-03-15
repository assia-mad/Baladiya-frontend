import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../../Tools/Pagination';
import Information from './Information'; 
import apiInstance from '../../../../../../API';
import Search from '../../../../Tools/Search';
import Filtering from '../../../../Tools/Filtering';
import NavigateButton from '../../../../Tools/NavigationButton';
import PrimaryColorText from '../../../../Tools/Title';


const Informations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [informations, setInformations] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('Tous les utilisateurs');
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const userDataString = localStorage.getItem('user');
  const userData = JSON.parse(userDataString);
  const filterItemslist = [ {name:t("Tous les utilisateurs"), value:"Tous les utilisateurs"},
                            {name:t("APC"), value:"Agent"},
                            {name:t("Admin"), value:"Admin"},
                                ];

  useEffect(() => {
    fetchData();
  }, [page, searchText, filter, userData.commune]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`social_informations/`, {
        params: {
          page,
          commune : userData.role === 'Admin'? '' : userData.commune,
          owner__role : filter === 'Tous les utilisateurs' ? '' : filter,
          search: searchText,
        },
      });
      setInformations(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleEdit = (informationId) => {
    navigate(`/informations/${informationId}`);
  };

  const handleDelete = async (infoId) => {
    try {
      const response = await apiInstance.delete(`social_informations/${infoId}/`);
      fetchData();
    }catch(error){
      console.log('error');
    }
    
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  return (
    <Box m={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item mt={5}>
          <PrimaryColorText className="title">
            {t('Informations')}
          </PrimaryColorText>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
          <Box mr={10}>
                <NavigateButton page={'/social_information'}/>
              </Box>
          <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist}/>
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <Information
            informations={informations}
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

export default Informations;
