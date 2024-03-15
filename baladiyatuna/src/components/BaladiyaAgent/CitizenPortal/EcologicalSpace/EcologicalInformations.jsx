import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EcologicalInformation from "./EcologicalInformation";
import Search from "../../../Tools/Search";
import Filtering from "../../../Tools/Filtering";
import PaginationItem from "../../../Tools/Pagination";
import apiInstance from "../../../../../API";
import NavigateButton from "../../../Tools/NavigationButton";
import PrimaryColorText from "../../../Tools/Title";

const EcologicalInformations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ecologicalInformations, setEcologicalInformations] = useState([]);
  const [filter, setFilter] = useState('Tous les utilisateurs');
  const [stateFilter, setStateFilter] = useState('Tous les publications');
  const [typeFilter, setTypeFilter] = useState('Tous les types');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const userDataString = localStorage.getItem('user');
  const userData = JSON.parse(userDataString);

  const filterItemslist = [
    { name: t("Tous les utilisateurs"), value: "Tous les utilisateurs" },
    { name: t("Créer par APC"), value: "Agent" },
    { name: t("Créer par Administrateur"), value: "Admin" },
  ];
  const stateFilterItemslist =[ 
    {name:t("Tous les publications"), value:"Tous les publications"},
    {name:t("En traitement"), value:"en traitement"},
    {name:t("Validé"), value:"validé"},
    {name:t("Refusé"), value:"refusé"},
        ];
  const typeFilterItemslist =[ 
    {name:t("Tous les types"), value:"Tous les types"},
    {name:t("Valorisation"), value:"valorisation"},
    {name:t("Sensibilisation"), value:"sensibilisation"},
        ];

  useEffect(() => {
    fetchData();
  }, [typeFilter, stateFilter, filter, page, searchText, userData.commune]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`ecological_informations/`, {
        params: {
          page,
          commune : userData.role === 'Admin' ? '': userData.commune,
          owner__role: filter === 'Tous les utilisateurs' ? '' : filter,
          state: stateFilter === 'Tous les publications' ? '' : stateFilter,
          type : typeFilter === 'Tous les types' ? '' : typeFilter,
          search: searchText,
        },
      });
      setEcologicalInformations(response?.results);
      setTotalPages(response?.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  };


  const handleFilterChange = (newValue) => {
    setFilter(newValue);
  };
  const handleStateFilterChange = (newValue) => {
    setStateFilter(newValue);
  };
  const handleTypeFilterChange = (newValue) => {
    setTypeFilter(newValue);
  };
  const handleEdit = (ecologicalInformationId) => {
    navigate(`/ecological_informations/${ecologicalInformationId}`);
  };

  const handleDelete = async (ecologicalInformationId) => {
    try {
      await apiInstance.delete(`ecological_informations/${ecologicalInformationId}/`);
      fetchData();
    } catch (error) {
      console.log("error");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`ecological_informations/${id}/`, { state });
      setEcologicalInformations((previnformations) =>
        previnformations.map((information) =>
          information.id === id ? { ...information, state } : information
        )
      );
    } catch (error) {
      console.log('Failed to change information state:', error);
    }
  };

  return (
    <Box m={3}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Avatar className="avatar">
          <CheckCircle />
        </Avatar>
        <Grid item>
          <PrimaryColorText className="title">
            {t("Informations Ecologiques")}
          </PrimaryColorText>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Box mr={10}>
              <NavigateButton page={'/ecological_information'}/>
            </Box>
            <Filtering
              filter={filter}
              onFilterChange={handleFilterChange}
              filteritems={filterItemslist}
            />
            <Filtering
              filter={stateFilter}
              onFilterChange={handleStateFilterChange}
              filteritems={stateFilterItemslist}
            />
            <Filtering
              filter={typeFilter}
              onFilterChange={handleTypeFilterChange}
              filteritems={typeFilterItemslist}
            />
            <Search
              setSearchText={setSearchText}
              searchText={searchText}
              fetchData={fetchData}
            />
          </Box>
        </Grid>
        <Grid item className="table-container">
          <EcologicalInformation
            ecologicalInformations={ecologicalInformations}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onValidate={handleSwitchChange}
            userRole={userData.role}
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

export default EcologicalInformations;
