import React, { useEffect, useState } from 'react';
import {Box,
        Grid,
        Typography,
        Avatar,
        Select,
        MenuItem,
        TextField,
        IconButton } from '@mui/material';   
import { CheckCircle, Search as SearchIcon } from '@mui/icons-material';
import PaginationItem from '../../../Tools/Pagination';
import Topic from './SportTopic';
import apiInstance from '../../../../../API';
import Search from '../../../Tools/Search';
import Filtering from '../../../Tools/Filtering';
import DeleteDialog from '../../../Tools/DeleteDialog';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavigateButton from '../../../Tools/NavigationButton';

const Topics = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [filter, setFilter] = useState('Tous les topics');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [ {name:t("Tous les topics"), value:"Tous les topics"},
                            {name:t("En traitement"), value:"en traitement"},
                            {name:t("Validé"), value:"validé"},
                            {name:t("Refusé"), value:"refusé"},
                              ]

  useEffect( () =>{
    fetchData();
  },[filter,page,searchText]);

  const fetchData = async () => {
    try {
        const response = await apiInstance.get(`topics/`,{
          params: {
            page,
            state : filter === 'Tous les topics' ? '' : filter,
            type : 'Sportif',
            search: searchText,
          },
        });
        console.log(filter,"this is the filter");
        setTopics(response?.results);
        setTotalPages(response?.total_pages);
        console.log("theeeeeeeee",response.results);

    }catch(error){
            console.log("errooor",error);
    }
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleEdit = (topicId) => {
      navigate(`/topics/${topicId}`)
  };

  const handleDelete = async (topicId) => {
    try {
      const response = await apiInstance.delete(`topics/${topicId}/`);
      fetchData();
    }catch(error){
      console.log("failed to deleeeeeeeeeeeeeeeeete")
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
      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
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
          <Typography className='title'>
          {t('Espace sportif')}
          </Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={10}>
              <NavigateButton page={'/topic'}/>
            </Box>
            <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist}/>
            <Search setSearchText={setSearchText}  searchText={searchText} fetchData={fetchData}/>
          </Box>
        </Grid>
        <Grid item className='table-container'>
          <Topic
            topics={topics}
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

export default Topics;
