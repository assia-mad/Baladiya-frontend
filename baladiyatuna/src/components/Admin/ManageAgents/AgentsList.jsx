import React from "react";
import { Box, Switch, Typography, Select, MenuItem } from '@mui/material';
import { useTranslation } from "react-i18next";
import TableComponent from "../../Tools/TableComponent";

const AgentsList = ({ users, handleDeactivate, handleChangeRole }) => {
  const { t } = useTranslation();

  const columns = [
    { label: 'ID', dataKey: 'id' },
    { label: 'Nom', dataKey: 'last_name' },
    { label: 'Prénom', dataKey: 'first_name' },
    { label: 'Email', dataKey: 'email' },
    { label: 'Role', dataKey: 'role' },
    { label: 'Etat de compte', render: (row) => (
      <Box display="flex" alignItems="center">
        <Switch
          checked={row.is_active}
          onChange={() => handleDeactivate(row, row.id)}
          color="primary"
        />
        <Typography variant="body2" sx={{ marginLeft: '8px' }}>
          {row.is_active ? 'Désactiver' : 'Activer'}
        </Typography>
      </Box>
    )},
    { label: 'Changer le role', render: (row) => (
      <Select
        value={row.role}
        onChange={(e) => handleChangeRole(row.id, e.target.value)}
        variant="outlined"
      >
        <MenuItem value="Admin">{t('Admin')}</MenuItem>
        <MenuItem value="Agent">{t('APC')}</MenuItem>
        <MenuItem value="Citoyen">{t('Citoyen')}</MenuItem>
        <MenuItem value="Association">{t('Association')}</MenuItem>
        <MenuItem value="Entrepreneur">{t('Entrepreneur')}</MenuItem>
      </Select>
    )},
  ];

  return (
    <TableComponent
      columns={columns}
      data={users}
    />
  );
};

export default AgentsList;
