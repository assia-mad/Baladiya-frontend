import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { styled } from "@mui/system";
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const handleLogout = () => {
    // Logout logic here
  };

  return (
    <StyledDrawer anchor="left" variant="permanent">
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
    </StyledDrawer>
  );
};

export default Sidebar;
