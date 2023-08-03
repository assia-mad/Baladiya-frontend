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
import './ManageUsers.css';


const ManageUSers = () => {
  const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('Numéro Social');
    const [searchText, setSearchText] = useState('');
    const filterItems = [{name:"Numéro Social", value:"Numéro Social"},
                        {name:"Approver", value:true},
                        {name:"Non approver", value:false}
                          ]
    

    useEffect(() => {
      fetchData();
    }, [page,filter,searchText]);
  
    const fetchData = async () => {
      console.log(searchText);
      console.log(filter);  
        try {
          const response = await apiInstance.get(
            `manage_users/`,
            {
              params: {
                page,
                social_approved: filter === 'Numéro Social' ? '' : filter,
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
                    <Typography className='title'>
                        {t('Gestion des Citoyens')}
                    </Typography>
                </Grid>
                <Grid item>
          <Box display="flex" alignItems="center" mb={2}>
            <Filtering filter={filter} setFilter={setFilter} filteritems={filterItems}/>
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