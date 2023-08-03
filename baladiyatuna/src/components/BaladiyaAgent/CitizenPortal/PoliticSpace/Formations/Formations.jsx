import React, { useEffect, useState } from 'react';
import {Box,
        Grid,
        Typography,
        Avatar,
        Select,
        MenuItem,
        TextField,
        IconButton } from '@mui/material';   
import { CheckCircle, FormatTextdirectionRToLOutlined, Search as SearchIcon } from '@mui/icons-material';
import PaginationItem from '../../../../Tools/Pagination';
import Formation from './Formation';
import apiInstance from '../../../../../../API';
import Search from '../../../../Tools/Search';
import Filtering from '../../../../Tools/Filtering';
import DeleteDialog from '../../../../Tools/DeleteDialog';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Formations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formations, setFormations] = useState([]);
  const [filter, setFilter] = useState('Tous les formations');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [ {name:"Tous les formations", value:"Tous les formations"},
                            {name:"En traitement", value:"en traitement"},
                            {name:"Validé", value:"validé"},
                            {name:"Refusé", value:"refusé"},
                              ]

  useEffect( () =>{
    fetchData();
  },[filter,page,searchText]);

  const fetchData = async () => {
    try {
        const response = await apiInstance.get(`formations/`,{
          params: {
            page,
            state : filter === 'Tous les formations' ? '' : filter,
            search: searchText,
          },
        });
        console.log(filter,"this is the filter");
        setFormations(response?.results);
        setTotalPages(response?.total_pages);
        console.log("theeeeeeeee",response.results);

    }catch(error){
            console.log("errooor",error);
    }
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleEdit = (formationId) => {
      navigate(`/formations/${formationId}`)
  };

  const handleDelete = async (formationId) => {
    try {
      const response = await apiInstance.delete(`formations/${formationId}/`);
      fetchData();
    }catch(error){
      console.log('error');
    }
    
  };
  const handlePageChange = (event, value) => {
    setPage(value); 
  };
  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`formations/${id}/`, { state });
      setFormations((prevformations) =>
        prevformations.map((formation) =>
          formation.id === id ? { ...formation, state } : formation
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
          {t ('Formations')}
          </Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist}/>
            <Search setSearchText={setSearchText}  searchText={searchText} fetchData={fetchData}/>
          </Box>
        </Grid>
        <Grid item className='table-container'>
          <Formation
            formations={formations}
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

export default Formations;
