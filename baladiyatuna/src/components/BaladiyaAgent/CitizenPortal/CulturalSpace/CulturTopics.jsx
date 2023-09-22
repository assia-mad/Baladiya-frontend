import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
} from '@mui/material';
import { CheckCircle, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaginationItem from '../../../Tools/Pagination';
import CulturTopic from './CulturTopic';
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';
import NavigateButton from '../../../Tools/NavigationButton';



const CulturTopics = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [culturalTopics, setCulturalTopics] = useState([]);
  const [filter, setFilter] = useState('Tous les topics');
  const [roleFilter, setRoleFilter] = useState('Tous les utilisateurs');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [
    { name: 'Tous les topics', value: 'Tous les topics' },
    { name: 'En traitement', value: 'en traitement' },
    { name: 'Validé', value: 'validé' },
    { name: 'Refusé', value: 'refusé' },
  ];
  const rolefilterItemslist = [
    { name: t("Tous les utilisateurs"), value: "Tous les utilisateurs" },
    { name: t("Créer par APC"), value: "Agent" },
    { name: t("Créer par Administrateur"), value: "Admin" },
    { name: t("Créer par Citoyen"), value: "Citoyen" },
    { name: t("Créer par Entrepreneur"), value: "Entrepreneur" },
    { name: t("Créer par Association"), value: "Association" },
  ];

  useEffect(() => {
    fetchData();
  }, [filter, page, searchText]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`topics/`, {
        params: {
          page,
          state: filter === 'Tous les topics' ? '' : filter,
          type: 'Culturel', 
          search: searchText,
        },
      });
      console.log(filter, 'this is the filter');
      setCulturalTopics(response?.results); 
      setTotalPages(response?.total_pages);
      console.log('theeeeeeeee', response.results);
    } catch (error) {
      console.log('errooor', error);
    }
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleRoleFilterChange = (newValue) => {
    setRoleFilter(newValue);
  };


  const handleEdit = (topicId) => {
    navigate(`/cultural_topics/${topicId}`); 
  };

  const handleDelete = async (topicId) => {
    try {
      const response = await apiInstance.delete(`topics/${topicId}/`);
      fetchData();
    } catch (error) {
      console.log('failed to deleeeeeeeeeeeeeeeeete');
      console.log('error');
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`topics/${id}/`, { state });
      setCulturalTopics((prevCulturalTopics) =>
        prevCulturalTopics.map((topic) =>
          topic.id === id ? { ...topic, state } : topic
        )
      );
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <Box m={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Avatar className="avatar">
          <CheckCircle />
        </Avatar>
        <Grid item>
          <Typography className="title">
            {t('Espace culturel')}
          </Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <NavigateButton page={'/cultural_topic'}/>
            <Box ml={10} >
            <Filtering
              filter={filter}
              onFilterChange={handleFilterChange}
              filteritems={filterItemslist}
            />
            </Box>
            <Search
              setSearchText={setSearchText}
              searchText={searchText}
              fetchData={fetchData}
            />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <CulturTopic
            culturalTopics={culturalTopics}
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

export default CulturTopics;
