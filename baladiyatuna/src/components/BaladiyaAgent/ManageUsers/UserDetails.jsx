import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Grid, Paper, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../API';
import PrimaryColorText from '../../Tools/Title';

const UserDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [user, setUser] = useState({
        first_name:'',
        last_name:'',
        email:'',
        phone:'',
        role:'',
        document:null,
    });

    const fetchUser = async () => {
        try{
            const response = await apiInstance.get(`/manage_users/${id}/`);
            setUser(response);
        }
        catch(error){
            console.log(error);
        }
            

    };
    useEffect(() => {
        fetchUser();
      }, [id]);

    return (
        <Box sx={{ flexGrow: 1 }} m={20}>
            <Grid container spacing={2}>
                <PrimaryColorText className='title' >{t('Informations Utilisateur')}</PrimaryColorText>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={user.document} alt={t("Document")} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' } }}>
                        <div>
                            <TextField
                                label={t('Prénom')}
                                value={user.first_name}
                                variant="outlined"
                                disabled
                            />
                            <TextField
                                label={t('Nom')}
                                value={user.last_name}
                                variant="outlined"
                                disabled
                            />
                        </div>
                        <div>
                            <TextField
                                label={t('Email')}
                                value={user.email}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                disabled
                            />
                            <TextField
                                label={t('Phone')}
                                value={user.phone}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                disabled
                            />
                        </div>
                        <div>
                            <TextField
                                label={t('Role')}
                                value={user.role}
                                variant="outlined"
                                disabled
                            />
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserDetails;
