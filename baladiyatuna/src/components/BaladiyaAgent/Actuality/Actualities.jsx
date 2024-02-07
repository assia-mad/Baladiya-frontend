import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Actuality from "./Actuality"; 
import Search from "../../Tools/Search";
import Filtering from "../../Tools/Filtering";
import PaginationItem from "../../Tools/Pagination";
import apiInstance from "../../../../API";
import NavigateButton from "../../Tools/NavigationButton";

const Actualities = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [actualities, setActualities] = useState([]);
  const [filter, setFilter] = useState('Tous les actualitées');
  const [typeFilter, setTypeFilter]= useState('Tous les types')
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [userRole, setUserRole] = useState('')
  const filterItemslist = [ 
    {name:t("Tous les actualitées"), value:"Tous les actualitées"},
    {name:t("En traitement"), value:"en traitement"},
    {name:t("Validé"), value:"validé"},
    {name:t("Refusé"), value:"refusé"},
    ]
    const typeFilterItemslist = [
      { name: t("Tous les types"), value: "Tous les types" },
      { name: t("Réalisation"), value: "Realisation" },
      { name: t("Education"), value: "Education" },
      { name: t("Entreprise"), value: "Entreprise" },
      { name: t("Sport"), value: "Sport" },
    ];
    
    const adminTypeFilterItemslist = [
      { name: t("Tous les types"), value: "Tous les types" },
      { name: t("Education"), value: "Education" },
      { name: t("Entreprise"), value: "Entreprise" },
    ];


    useEffect(() => {
      fetchUserRole();
    }, []);  
    
    useEffect(() => {
      if (userRole) {
        fetchData();
      }
    }, [typeFilter, filter, page, searchText, userRole]); 
    
    const fetchUserRole = async () => {
      try {
        const response = await apiInstance.get('user/');
        setUserRole(response?.role);
      } catch (error) {
        console.log('Error fetching user role', error);
      }
    };
    
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          page: page,
          state: filter === 'Tous les actualitées' ? '' : filter,
          search: searchText,
        });
    
        const endpoint = userRole === "Admin" ? 'admin_actualities/' : 'actualities/';
    
        if (userRole !== "Admin" || typeFilter !== 'Tous les types') {
          params.append('type', typeFilter);
        }

        const response = await apiInstance.get(`${endpoint}?${params.toString()}`);
        setActualities(response?.results);
        setTotalPages(response?.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    
    
    

  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };
  const handleTypeFilterChange = (newValue) => {

    setTypeFilter(newValue);
  };
  const handleEdit = (actualityId) => {
    navigate(`/actualities/${actualityId}`);
  };

  const handleDelete = async (actualityId) => {
    try {
      const response = await apiInstance.delete(`actualities/${actualityId}/`);
      fetchData();
    } catch (error) {
      console.log('error');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`actualities/${id}/`, { state });
      setActualities((prevacts) =>
        prevacts.map((actuality) =>
          actuality.id === id ? { ...actuality, state } : actuality
        )
      );
    } catch (error) {
      console.log('error');
    }
  };
  const isAdmin = userRole === "Admin";

  return (
    <Box m={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Avatar className="avatar">
          <CheckCircle />
        </Avatar>
        <Grid item>
          <Typography className='title'>
            {t('Actualitées')}
          </Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={10}>
              <NavigateButton page={'/actuality'} />
            </Box>
            <Filtering
            filter={typeFilter}
            onFilterChange={handleTypeFilterChange}
            filteritems={isAdmin ? adminTypeFilterItemslist : typeFilterItemslist}
          />
            <Filtering filter={filter} onFilterChange={handleFilterChange} filteritems={filterItemslist} />
            <Search setSearchText={setSearchText} searchText={searchText} fetchData={fetchData} />
          </Box>
        </Grid>
        <Grid item className='table-container'>
          <Actuality
            actualities={actualities}
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

export default Actualities;
