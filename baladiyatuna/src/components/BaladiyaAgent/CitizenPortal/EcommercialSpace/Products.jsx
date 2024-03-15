import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar, Select, MenuItem, TextField, IconButton } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../Tools/Pagination';
import Product from './Product';
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';
import NavigateButton from '../../../Tools/NavigationButton';
import PrimaryColorText from '../../../Tools/Title';

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); 
  const [filter, setFilter] = useState('Tous les Produits');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const userDataString = localStorage.getItem('user');
  const userData = JSON.parse(userDataString);
  const filterItemslist = [ 
    {name:t("Tous les Produits"), value:"Tous les Produits"},
    {name:t("Vente"), value:"Vente"},
    {name:t("Allocation"), value:"Allocation"},
    {name:t("Echange"), value:"Echange"},
    ];

  useEffect(() => {
    fetchData();
  }, [userData.commune,filter, page, searchText]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`products/`, {
        params: {
          page,
          commune : userData.role === 'Admin' ? '' : userData.commune,
          action_type: filter === 'Tous les Produits' ? '' : filter,
          search: searchText,
        },
      });
      setProducts(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleEdit = (productId) => {
    navigate(`/products/${productId}`); 
  };

  const handleDelete = async (productId) => {
    try {
      const response = await apiInstance.delete(`products/${productId}/`);
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
      const response = await apiInstance.patch(`products/${id}/`, { state });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, state } : product
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
          <PrimaryColorText className='title'>
            {t('Products')}
          </PrimaryColorText>
        </Grid>
        <Grid item>
        <Box display="flex" alignItems="center" mb={2}>
          <NavigateButton page={'/product'} />
          <Box ml={10}>
              <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist} />
          </Box>
          <Box mr={2}>
              <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Box>
        </Grid>
        <Grid item className='table-container'>
          <Product 
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onActivate={handleSwitchChange} 
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

export default Products;
