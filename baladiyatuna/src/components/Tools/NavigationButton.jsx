import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles"; 

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, 
  color: theme.palette.primary.contrastText,

  "&:hover": {
    backgroundColor: theme.palette.primary.dark, 
  },
}));

const NavigateButton = ({ page }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleButtonClick = () => {
    navigate(page);
  };

  return (
    <StyledButton variant="contained" onClick={handleButtonClick}>
      {t('Create')}
    </StyledButton>
  );
};

export default NavigateButton;
