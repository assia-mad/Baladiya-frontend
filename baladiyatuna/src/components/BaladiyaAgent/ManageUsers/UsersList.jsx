import React from "react";
import { Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
    IconButton} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const UsersList = ({users,handleApproveChange}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();


    const handleNavigateToDetails = (userId) => {
        navigate(`/user/${userId}`);
    };

    const handleSwitchChange = (event, user, userId) => {
        event.stopPropagation();
        handleApproveChange(user, userId);
    };

    return (  
        <TableContainer >
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell><b>{t('ID')}</b></TableCell>
                        <TableCell><b>{t('Document')}</b></TableCell>
                        <TableCell><b>{t('Nom')}</b></TableCell>
                        <TableCell><b>{t('Prénom')}</b></TableCell>
                        <TableCell><b>{t('Role')}</b></TableCell>
                        <TableCell><b>{t('Approuver')}</b></TableCell>
                        <TableCell><b>{t('Details')}</b></TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                    <TableRow 
                        key={user.id} 
                        hover
                        style={{ cursor: 'pointer' }}
                    >
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                                <img src={user.document} alt="Document" style={{ maxWidth: '100px', maxHeight: '100px' }}/>
                        </TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                        <Switch
                            checked={user.social_approved}
                            onChange={(event) => handleSwitchChange(event, user, user.id)}
                            color="primary"
                        />

                        </TableCell>
                        <TableCell>
                                <IconButton onClick={() => handleNavigateToDetails(user.id)}>
                                    <ArrowForwardIosIcon color="primary" />
                                </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>);}

export default UsersList;