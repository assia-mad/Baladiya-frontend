import React, { useState } from 'react';
import { Menu, MenuItem, Card, Typography, CardContent, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Styled components using Material-UI system
const CardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4), // Increase the gap between items
  marginTop: theme.spacing(10),
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // Show fewer cards per row on medium and larger screens
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)', // Show 1 card per row on small screens
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
      setAnchorEl(event.currentTarget);  // Attach the menu to the clicked element
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
