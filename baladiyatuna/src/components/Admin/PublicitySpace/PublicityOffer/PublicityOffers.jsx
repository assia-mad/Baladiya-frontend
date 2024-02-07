import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../Tools/Pagination';
import PublicityOffer from './PublicityOffer'; 
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import NavigateButton from '../../../Tools/NavigationButton';
import PrimaryColorText from '../../../Tools/Title';


const PublicityOffers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [publicityOffers, setPublicityOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      const response = await apiInstance.get('publicity_offers/', {
        params: {
          page,
          search: searchText,
        },
      });
      setPublicityOffers(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('Error fetching publicity offers', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleEdit = (offerId) => {
    navigate(`/publicity_offers/${offerId}`);
  };

  const handleDelete = async (offerId) => {
    try {
      await apiInstance.delete(`publicity_offers/${offerId}/`);
      fetchData();
    } catch (error) {
      console.log('Error deleting publicity offer', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box m={3} mt={10}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <PrimaryColorText className="title">{t('Offre de Publicités')}</PrimaryColorText>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={5}>
            <NavigateButton page={'/publicity_offer'} />
            </Box>
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <PublicityOffer
            offers={publicityOffers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
        <Grid item>
          <PaginationItem page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicityOffers;
