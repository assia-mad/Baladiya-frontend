import React from "react";
import { useState,  useEffect } from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Accompagnement from "./Accompagnement";
import Search from "../../../../Tools/Search";
import Filtering from "../../../../Tools/Filtering";
import PaginationItem from "../../../../Tools/Pagination";
import apiInstance from "../../../../../../API";
import NavigateButton from "../../../../Tools/NavigationButton";
import PrimaryColorText from "../../../../Tools/Title";

const EconomicAccompagnements = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [accompagnements, setAccompagnements] = useState([]);
    const [filter, setFilter] = useState('Tous les utilisateurs');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState('');
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);

    const filterItemslist = [ {name:t("Tous les utilisateurs"), value:"Tous les utilisateurs"},
                              {name:t("Créer par APC"), value:"Agent"},
                              {name:t("Créer par Administrateur"), value:"Admin"},
                                ];
  
    useEffect( () => {
      fetchData();
    },[filter,page,searchText, userData.commune]);
  
    const fetchData = async () => {
      try {
          const response = await apiInstance.get(`accompagnements/`,{
            params: {
              page,
              commune : userData.role === 'Admin' ? '' : userData.commune,
              type:'Economique',
              owner__role : filter === 'Tous les utilisateurs' ? '' : filter,
              search: searchText,
            },
          });
          setAccompagnements(response?.results);
          setTotalPages(response?.total_pages);
          console.log("theeeeeeeee",response.results);
  
      }catch(error){
              console.log("errooor",error);
      }
    };
  
    const handleFilterChange = (newValue) => {
      setFilter(newValue);
    };
  
    const handleEdit = (accompagnementId) => {
        navigate(`/economic_accompagnements/${accompagnementId}`)
    };
  
    const handleDelete = async (accompagnementId) => {
      try {
        const response = await apiInstance.delete(`accompagnements/${accompagnementId}/`);
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
        const response = await apiInstance.patch(`accompagnements/${id}/`, { state });
            setAccompagnements((prevaccompagnements) =>
            prevaccompagnements.map((accompagnement) =>
            accompagnement.id === id ? { ...accompagnement, state } : accompagnement
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
            <PrimaryColorText className='title'>
            {t ('Accompagnements')}
            </PrimaryColorText>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center" mb={2}>
              <Box mr={10}>
                <NavigateButton page={'/economic_accompagnement'}/>
              </Box>
              <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist}/>
              <Search setSearchText={setSearchText}  searchText={searchText} fetchData={fetchData}/>
            </Box>
          </Grid>
          <Grid item className='table-container'>
            <Accompagnement
              accompagnements={accompagnements}
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
}
export default EconomicAccompagnements;