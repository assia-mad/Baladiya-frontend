import React, { useState } from 'react';
import { Menu, MenuItem, Card, Typography, CardContent, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4), 
  marginTop: theme.spacing(10),
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', 
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)', 
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '90%',
  margin: theme.spacing(1.5),
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
  },
  fontSize: "large",
  color: theme.palette.primary.main
}));

const CitizenPortal = ({ cardData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const navigate = useNavigate();
  const [menuWidth, setMenuWidth] = useState(null);

  const handleCardClick = (event, item) => {
    if (item.items) {
      setAnchorEl(event.currentTarget);  
      setCurrentItems(item.items);
      setMenuWidth(event.currentTarget.offsetWidth);
    }
    else if (item.onClick) {
      item.onClick();
  }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <div>
      <CardContainer>
        {cardData.map((item, index) => (
          <StyledCard key={index} onClick={(event) => handleCardClick(event, item)}>
            <StyledCardContent>
              {item.icon}
              <Typography variant="h6" component="div" color="primary">
                {item.title}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        ))}
      </CardContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: menuWidth, 
          },
        }}
      >
        {currentItems.map((item, index) => (
          <MenuItem key={index} onClick={() => handleMenuItemClick(item.path)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CitizenPortal;
