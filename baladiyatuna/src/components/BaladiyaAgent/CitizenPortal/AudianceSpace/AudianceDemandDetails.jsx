import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../../API';
import StateMenuSelect from '../../../Tools/StateMenu';
import PrimaryColorText from '../../../Tools/Title';

const meet_types = [
    { value: 'Privé', label: 'Privé' },
    { value: 'Publique', label: 'Publique' }
];

const public_meet_types = [
    { value: 'Politique', label: 'Politique' },
    { value: 'Sociale/Santé', label: 'Sociale/Santé' },
    { value: 'Economique/Commercial', label: 'Economique/Commercial' },
    { value: 'Culturel/Educatif', label: 'Culturel/Éducatif' },
    { value: 'Ecologique', label: 'Ecologique' },
    { value: 'Autre', label: 'Autre' }
];

const AudienceDemandDetails = ({ mode, handleChange, handleSwitchChange, handleUpdate, handleCreate, modifiedDemand }) => {
    const [ownerName, setOwnerName] = useState('');
    const { t } = useTranslation();
    const [date, setDate] = useState(mode === 'update' ? new Date(modifiedDemand.date) : new Date());
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        if (mode === 'update') {
            const fetchOwnerName = async () => {
                try {
                    const response = await apiInstance.get(`/manage_users/${modifiedDemand.owner}/`);
                    setOwnerName(`${response?.first_name} ${response?.last_name}`);
                } catch (error) {
                    console.log('Error fetching owner name', error);
                }
            };

            fetchOwnerName();
        }
    }, [modifiedDemand.owner, mode]);

    return (
        <Box mt={10} ml={mode === 'update' ? 20 : 30} mr={mode === 'update' ? 20 : 30}>
            <Grid container alignItems="center" direction={isMobile ? 'column' : 'row'}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PrimaryColorText className='title'>
                                {t('Demande Audience')}
                            </PrimaryColorText>
                        </Grid>
                        {mode === 'update' &&
                            <>
                                <Grid item xs={6}>
                                    <TextField
                                        name="created_at"
                                        label={t("Created At")}
                                        fullWidth
                                        value={new Date(modifiedDemand.created_at).toLocaleString()}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="owner"
                                        label={t("Owner")}
                                        fullWidth
                                        value={ownerName}
                                        disabled
                                    />
                                </Grid>
                            </>
                        }
                        <Grid item xs={6}>
                            <TextField
                                name="person"
                                label={t("Personne")}
                                fullWidth
                                value={modifiedDemand.person}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="meet-type-label">{t("Type de Rencontre")}</InputLabel>
                                <Select
                                    labelId="meet-type-label"
                                    id="meet-type"
                                    value={modifiedDemand.meet_type}
                                    label={t("Type de Rencontre")}
                                    onChange={handleChange}
                                    name="meet_type"
                                >
                                    {meet_types.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {modifiedDemand.meet_type === 'Publique' &&
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="public-meet-type-label">{t("Type de Rencontre Publique")}</InputLabel>
                                    <Select
                                        labelId="public-meet-type-label"
                                        id="public-meet-type"
                                        value={modifiedDemand.public_meet_type}
                                        label={t("Type de Rencontre Publique")}
                                        onChange={handleChange}
                                        name="public_meet_type"
                                    >
                                        {public_meet_types.map((type) => (
                                            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        }
                        <Grid item xs={6}>
                            <DateTimePicker 
                                onChange={setDate}
                                value={date}
                                format="dd-MM-yyyy HH:mm"
                            />
                        </Grid>
                        {mode === 'update' &&
                            <Grid item xs={12}>
                                <StateMenuSelect
                                  currentState={modifiedDemand.state}
                                  onChangeState={(newState) => handleSwitchChange(modifiedDemand.id, newState)}
                                />
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => { mode === 'update' ? handleUpdate(date) : handleCreate(date) }}
                                >
                                    {mode === 'update' ? t('Save') : t('Create')}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AudienceDemandDetails;
