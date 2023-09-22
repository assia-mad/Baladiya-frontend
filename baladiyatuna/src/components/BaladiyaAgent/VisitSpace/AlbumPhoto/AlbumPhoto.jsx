import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Avatar } from '@mui/material';
import { CheckCircle, Search as SearchIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../../API';
import CardItem from '../../../Tools/CardTemplate';
import Filtering from '../../../Tools/Filtering';
import Search from '../../../Tools/Search';
import NavigateButton from '../../../Tools/NavigationButton';
import PaginationItem from '../../../Tools/Pagination';


const AlbumPhoto = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('Toutes les visites');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [
    { name: t("Toutes les visites"), value: "Toutes les visites" },
    { name: t("En traitement"), value: "en traitement" },
    { name: t("Validé"), value: "validé" },
    { name: t("Refusé"), value: "refusé" },
  ];

  useEffect(() => {
    fetchData();
  }, [filter, page, searchText]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`albums/`, {
        params: {
          page,
          state: filter === 'Toutes les visites' ? '' : filter,
          search: searchText,
        },
      });
      setPhotos(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.error('error', error);
    }
  };

  const onEdit = (id) => {
    navigate(`/albums/${id}`);
  };

  const onDelete = async (id) => {
    try {
      await apiInstance.delete(`albums/${id}/`);
      fetchData();
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  };
  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`albums/${id}/`, { state });
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.id === id ? { ...photo, state } : photo
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
          <Typography className="title">{t('Album photo')}</Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={10}>
              <NavigateButton page={'/album'} />
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
      <Grid container spacing={2} mt={2}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
            <CardItem item={photo} onDelete={onDelete} onEdit={onEdit} onValidate={handleSwitchChange} />
          </Grid>
        ))}
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

export default AlbumPhoto;
