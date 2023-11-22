import React, { useEffect, useState } from 'react';
import {
        Grid,
        Typography,
        Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Search from '../../Tools/Search';
import Filtering from '../../Tools/Filtering';
import UsersList from './UsersList';
import PaginationItem from '../../Tools/Pagination';
import apiInstance from '../../../../API';
import PrimaryColorText from '../../Tools/Title';
import './ManageUsers.css';


const ManageUSers = () => {
  const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('Role');
    const [ApprovedFilter, setApprovedFilter]=useState('Approuver');
    const [searchText, setSearchText] = useState('');
    const filterItems = [{name:t("Role"), value:"Role"},
                        {name:t("Citoyen"), value:"Citoyen"},
                        {name:t("Association"), value:"Association"},
                        {name:t("Entrepreneur"), value:"Entrepreneur"},
                          ]
    const ApprovedfilterItems = [{name:t("Approuver"), value:"Approuver"},
    {name:t("Oui"), value:true},
    {name:t("Non"), value:false},
      ]
    

    useEffect(() => {
      fetchData();
    }, [page,filter,ApprovedFilter,searchText]);
  
    const fetchData = async () => {
      console.log(searchText);
      console.log(filter);  
        try {
          const response = await apiInstance.get(
            `manage_users/`,
            {
              params: {
                page,
                role: filter === 'Role' ? '' : filter,
                social_approved: ApprovedFilter === 'Approuver'? '' : ApprovedFilter,
                search: searchText,
              },
            }
          );
          setUsers(response?.results);
          setTotalPages(response?.total_pages);
          setIsPending(false);
        } catch (error) {
          setIsPending(false);
          console.log(error);
        }
    };
    const handleApproveChange = async (user,userId) => {
      const checked = user.social_approved ? false : true;
      const data = {
          social_approved : checked
      };
      try {
          await apiInstance.patch(`manage_users/${userId}/`, data);
          fetchData();
      } catch(error) {
          console.log(error);
      }
  
  };
  
    const handlePageChange = (event, value) => {
        setPage(value);
    };
  
    
    if (isPending) {
        return( <div>Loading...</div>)
    }

    return (
       
        <Box m={3}>
            <Grid  container direction="column" alignItems="center" spacing={2}>
                <Grid item marginTop={4}>
                    <PrimaryColorText className='title'>
                        {t('Gestion des Citoyens')}
                    </PrimaryColorText>
                </Grid>
                <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Filtering filter={filter} onFilterChange={setFilter} filteritems={filterItems}/>
            <Filtering filter={ApprovedFilter} onFilterChange={setApprovedFilter} filteritems={ApprovedfilterItems}/>
            <Search setSearchText={setSearchText}  searchText={searchText} fetchData={fetchData}/>
          </Box>
        </Grid>
            <Grid item className='table-container'>
                <UsersList users={users} handleApproveChange={handleApproveChange} />
            </Grid>
            <Grid item>
                <PaginationItem totalPages={totalPages} page={page} handlePageChange={handlePageChange} />
            </Grid>
        </Grid>
      </Box>


    );
}
export default ManageUSers;