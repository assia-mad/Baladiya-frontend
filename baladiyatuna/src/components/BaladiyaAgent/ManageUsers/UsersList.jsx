import React from "react";
import { Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch} from '@mui/material';


const UsersList = ({users,handleApproveChange}) => {
    return (  
        <TableContainer >
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>Nom</b></TableCell>
                        <TableCell><b>Prénom</b></TableCell>
                        <TableCell><b>Numéro Social</b></TableCell>
                        <TableCell><b>Approuver</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.social_number}</TableCell>
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