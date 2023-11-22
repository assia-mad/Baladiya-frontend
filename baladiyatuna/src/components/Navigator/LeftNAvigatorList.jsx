import React, {useState} from 'react';
import Sidebar from "./LeftNavigator";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import WarningIcon from '@mui/icons-material/Warning';

const LeftNavigatorList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

  const handleMenuOpen = (event, items) => {
    setAnchorEl(event.currentTarget);
    setMenuItems(items);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const navigationItems = [
    {
      text: t('Gestion des utilisateurs'),
      icon: <ManageAccountsIcon />,
      onClick: () => navigate('/manage_users')
    },
    {
      text: t('Gestion portail citoyen'),
      icon: <GroupIcon />,
      onClick: () => navigate('/citizen_portal')
    },
    {
        text: t('Espace Visiteur'),
        icon: <BeachAccessIcon />,
        onClick: (event) => handleMenuOpen(event, [
          { label: t('Visite guidé'), path: '/visits' },
          { label: t('Album Photo'), path: '/albums' },
          { label: t('Historique'), path: '/albums' }
        ])
      },
      {
        text: t('Actualité'),
        icon: <NewspaperIcon />,
        onClick: () => navigate('/actualities')
      },
      {
        text: t('Gestion des risques'),
        icon: <WarningIcon />,
        onClick: () => navigate('/dangers')
      },
  ];

  return (
    <>
      <Sidebar navigationItems={navigationItems} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
            style: {
            width: anchorEl ? anchorEl.clientWidth : null, 
            },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => handleMenuItemClick(item.path)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
        }
export default LeftNavigatorList;
