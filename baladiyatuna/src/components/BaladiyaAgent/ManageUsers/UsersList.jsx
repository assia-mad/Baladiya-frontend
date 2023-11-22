import React from "react";
import { Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch} from '@mui/material';
import { useTranslation } from "react-i18next";


const UsersList = ({users,handleApproveChange}) => {
    const { t } = useTranslation();
    return (  
        <TableContainer >
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell><b>{t('ID')}</b></TableCell>
                        <TableCell><b>{t('Nom')}</b></TableCell>
                        <TableCell><b>{t('Prénom')}</b></TableCell>
                        <TableCell><b>{t('Role')}</b></TableCell>
                        <TableCell><b>{t('Approuver')}</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                        <Switch
                            checked={user.social_approved}
                            onChange={() => handleApproveChange(user,user.id)}
                            color="primary"
                        />

                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>);}

export default UsersList;