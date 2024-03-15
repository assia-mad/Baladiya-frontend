import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, IconButton,List, ListItem, ListItemText, ListItemIcon, Drawer, makeStyles } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import apiInstance from "../../../API";
import LanguageSelector from "../Tools/Languages/ChangeLanguage";
import CollapsibleLeftNavigator from "./CollapsibleLeftNavigator";
import './Navigator.css';


const StyledAppBar = styled(AppBar)({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    boxShadow: "none", 
  });
  
  
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });
  
  const StyledTypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    cursor: "pointer",
    alignItems: "center",
    color: theme.palette.primary.main, 
  }));
  
  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontSize: "20px",
    fontFamily: "sans-serif",
    marginLeft: theme.spacing(3),
    "&:hover": {
      color: theme.palette.secondary.main,
      borderBottom: "1px solid white",
    },
  }));
  const StyledAvatarContainer = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main, 
  }));
  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    cursor: "pointer",
    marginLeft:"20px",
    color: theme.palette.primary.main,
  }));

  const StyledList= styled(List)({
    width : "200px",
  })
  
  const NavigationBar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const storedApiEndpoint = sessionStorage.getItem('apiEndpoint');
    const token = sessionStorage.getItem('token');
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setDrawerOpen(open);
    };

    const handleMenuIconClick = () => {
      setDrawerOpen(true);
    };
  
    const handleDrawerClose = () => {
      setDrawerOpen(false);
    };

    const handleLogout = () => {
      apiInstance.post(`logout/`)
      .then(response => {
          console.log("success");
          sessionStorage.removeItem('token');
          navigate("/");
          
      }).catch(error => {
        console.log(error);
      })
    };

    // const fetchUSer = async () =>{
    //     try {
    //         const response = await apiInstance.get(`user/`);
    //         console.log('fetching the user', response);
    //         setUserImage(response?.image);
    //         setUserRole(response.role);
    //     } catch(error){
    //         console.log(error);
    //     }
    // }
    // useEffect(() =>{
    //     fetchUSer();
    // },[userImage]);

    return (
        <>
        <StyledAppBar>
          <StyledToolbar>
            <IconButton className="menu-icon" onClick={handleMenuIconClick}><MenuRoundedIcon color="primary" /></IconButton>
            <StyledAvatarContainer>
              <div>
                <StyledLink to="/home">{t("Home")}</StyledLink>
                <StyledLink to="/about">{t("About")}</StyledLink>
                <StyledLink to="/manage_users">{t("Gérer")}</StyledLink>
                <LanguageSelector/>
              </div>
              <Link to="/profile">
                <StyledAvatar alt="User Avatar" src={userData.image} />
              </Link>
            </StyledAvatarContainer>
          </StyledToolbar>
        </StyledAppBar>
        <CollapsibleLeftNavigator isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} userRole={userData.role} />
        </>
    );
  };
  
  

export default NavigationBar;  