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
import Agenda from './Agenda';
import apiInstance from '../../../../../../API';
import Search from '../../../../Tools/Search';
import Filtering from '../../../../Tools/Filtering';
import NavigateButton from '../../../../Tools/NavigationButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Agendas = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [agendas, setAgendas] = useState([]);
  const [filter, setFilter] = useState('Tous les agendas');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const filterItemslist = [ {name:t("Tous les agendas"), value:"Tous les agendas"},
                            {name:t("En traitement"), value:"en traitement"},
                            {name:t("Validé"), value:"validé"},
                            {name:t("Refusé"), value:"refusé"},
                              ]

  useEffect( () =>{
    fetchData();
  },[filter,page,searchText]);

  const fetchData = async () => {
    try {
        const response = await apiInstance.get(`agendas/`,{
          params: {
            page,
            state : filter === 'Tous les agendas' ? '' : filter,
            search: searchText,
          },
        });
        console.log(filter,"this is the filter");
        setAgendas(response?.results);
        setTotalPages(response?.total_pages);
        console.log("theeeeeeeee",response.results);

    }catch(error){
            console.log("errooor",error);
    }
  };

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };

  const handleEdit = (agendaId) => {
      navigate(`/agendas/${agendaId}`)
  };

  const handleDelete = async (agendaId) => {
    try {
      const response = await apiInstance.delete(`agendas/${agendaId}/`);
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
      const response = await apiInstance.patch(`agendas/${id}/`, { state });
      setAgendas((prevagendas) =>
        prevagendas.map((agenda) =>
          agenda.id === id ? { ...agenda, state } : agenda
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
          {t ('Agenda')}
          </Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
             <Box mr={10}>
                <NavigateButton page={'/agenda'}/>
              </Box>
            <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist}/>
            <Search setSearchText={setSearchText}  searchText={searchText} fetchData={fetchData}/>
          </Box>
        </Grid>
        <Grid item className='table-container'>
          <Agenda
            agendas={agendas}
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

export default Agendas;
