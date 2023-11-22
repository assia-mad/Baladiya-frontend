import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography,  Avatar, CircularProgress} from '@mui/material';
import { CheckCircle} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import './ManageAgents.css'
import Filtering from '../../Tools/Filtering';
import Search from '../../Tools/Search';
import PaginationItem from '../../Tools/Pagination';
import AgentsList from './AgentsList';
import { API_URL } from '../../../config';
import apiInstance from '../../../../API';
import PrimaryColorText from '../../Tools/Title';


const ManageAgents = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [roleFilter, setRoleFilter] = useState('Role');
    const [accountStatusFilter, setAccountStatusFilter] = useState('Compte');
    const [searchText, setSearchText] = useState('');
    const RolefilterItems = [
      {name:"Role", value:"Role"},
      {name:"Admin", value:"Admin"},
      {name:"Agent", value:"Agent"},
      {name:"Citoyen", value:"Citoyen"}
      ];
    const AccountfilterItems = [
      {name:"Compte", value:"Compte"},
      {name:"Activer", value:true},
      {name:"Désactiver", value:false},
      ];

    useEffect(() => {
        fetchData();
    }, [page, accountStatusFilter,roleFilter,searchText]);


    const fetchData = async () => {
      try {
        const response = await apiInstance.get(
          `manage_users/`,
          {
            params: {
              page,
              role: roleFilter === 'Role' ? '' : roleFilter,
              is_active: accountStatusFilter === 'Compte' ? '' : accountStatusFilter,
              search: searchText,
            }
          }
        );
        
        setUsers(response?.results);
        setTotalPages(response?.total_pages);
        setIsPending(false);
      } catch (error) {
        console.log(error);
        setIsPending(false);
      }
    };
    
    const handleDeactivate =  async (user,userId) => {
        const checked = !user.is_active;
        const data = {
            is_active : checked
        }
        try {
            await apiInstance.patch(`manage_users/${userId}/`, data);
            fetchData();

        }catch(error){
          console.log(error);
        }

    };

    const handleChangeRole = async (userId, roleValue) => {
        const data = {
            role : roleValue
        }

        try {
            await apiInstance.patch(`manage_users/${userId}/`,data);
            fetchData();
        }catch(error){
            console.log(error);
        }

  };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

  if (isPending) {
    return <CircularProgress />
};

  return (
    <Box m={2}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Avatar className="avatar">
            <CheckCircle />
        </Avatar>
        <Grid item>
        <PrimaryColorText className='title'>
                    {t ('Gestion des utilisateurs')}
        </PrimaryColorText>
        </Grid>
        <Box display="flex" alignItems="center" mb={2}>
            <Filtering filter={accountStatusFilter} onFilterChange={setAccountStatusFilter} filteritems={AccountfilterItems}/>
            <Filtering filter={roleFilter} onFilterChange={setRoleFilter} filteritems={RolefilterItems}/>
            <Search setSearchText={setSearchText}  searchText={searchText} fetchData={fetchData}/>
          </Box>
        <Grid item style={{ width: '100%', margin: '0 20px' }}>
            <AgentsList users={users} handleChangeRole={handleChangeRole} handleDeactivate={handleDeactivate} />
        </Grid>
        <Grid item>
            <PaginationItem 
              totalPages={totalPages}
              page={page}
              handlePageChange={handlePageChange}
            />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManageAgents;
