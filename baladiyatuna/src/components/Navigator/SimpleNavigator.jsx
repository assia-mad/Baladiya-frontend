import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";


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
  
  const StyledTypography = styled(Typography) (({theme}) => ({
    flexGrow: 1,
    cursor: "pointer",
    alignItems: "center",
    color: theme.palette.primary.main,
  }));
  
  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(3),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  }));
  const StyledAvatarContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });
  const StyledAvatar = styled(Avatar)({
    cursor: "pointer",
    marginLeft:"20px",
  });

  
  const SimpleNavigator = () => {
    const { t } = useTranslation();
    return (
        <StyledAppBar>
        <StyledToolbar>
          <StyledTypography variant="h5" component="div">
            {t('BaladiyaTuna')}
          </StyledTypography>
          {/* <StyledAvatarContainer>
            <div>
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/about">About</StyledLink>
              <StyledLink to="/manage_users">Gérer</StyledLink>
              <StyledLink to="/faq">FAQ</StyledLink>
            </div>
          </StyledAvatarContainer> */}
        </StyledToolbar>
      </StyledAppBar>
    );
  };
  
  

export default SimpleNavigator;  