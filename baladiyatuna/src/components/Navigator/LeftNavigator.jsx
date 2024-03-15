import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, useMediaQuery } from '@mui/material';
import { styled, useTheme } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../API';
import './Navigator.css';

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginTop: "15%",
  flexGrow: 1,
  cursor: "pointer",
  alignItems: "center",
  color: "white",
  textAlign: "center",
  marginBottom: "15px",
}));

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  color: "white",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "19%",
    borderRadius: "15px",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "auto",
  marginRight: theme.spacing(2),
  color: "white",
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  fontSize: "2px !important",
  width: "100%",
  margin: 0,
}));

const Sidebar = ({ navigationItems }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    apiInstance.post('/logout/')
    .then(response => {
      sessionStorage.removeItem('token');
      navigate('/');
    })
    .catch(error => {
      // console.error('Logout failed', error);
    });
  };

  const drawerContent = (
    <React.Fragment>
      <StyledTypography variant="h5" component="div">
        BaladiyaTuna
      </StyledTypography>
      <StyledList>
        {navigationItems.map((item, index) => (
          <StyledListItem button key={index} onClick={item.onClick}>
            <StyledListItemIcon>
              {item.icon}
            </StyledListItemIcon>
            <StyledListItemText>
              <Typography variant="body1" style={{ fontSize: '15px' }}>
                {t(item.text)}
              </Typography>
            </StyledListItemText>
          </StyledListItem>
        ))}
        <StyledListItem button onClick={handleLogout}>
          <StyledListItemIcon>
            <LogoutIcon />
          </StyledListItemIcon>
          <StyledListItemText>
            <Typography variant="body1" style={{ fontSize: '15px' }}>
              {t("Logout")}
            </Typography>
          </StyledListItemText>
        </StyledListItem>
      </StyledList>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'block', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <StyledDrawer
        anchor="left"
        variant={isMobile ? 'temporary' : 'permanent'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
      >
        {drawerContent}
      </StyledDrawer>
    </React.Fragment>
  );
};

export default Sidebar;
