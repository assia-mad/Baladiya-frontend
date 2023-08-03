import React from "react";
import { Card, Typography, CardContent, Box } from "@mui/material";
import { styled } from "@mui/system";


const CardContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.5),
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)', // Show 3 cards per row on medium and larger screens
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // Show 2 cards per row on small screens
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '80%',
  margin: theme.spacing(1.5), 
  marginTop: theme.spacing(8), 
}));

const StyledCardContent = styled(CardContent) (({theme}) => ({
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        cursor: "pointer",
      },
    fontSize: "large",
    color: theme.palette.primary.main

}));

const CitizenPortal = ({cardData}) => {
  return (
    <div>
    <CardContainer>
      {cardData.map((item, index) => (
        <StyledCard key={index}>
          <StyledCardContent onClick={item.onClick}>
            {item.icon}
            <Typography variant="h6" component="div" color="primary">
              {item.title}
            </Typography>
          </StyledCardContent>
        </StyledCard>
      ))}
    </CardContainer>
    </div>
  );
};

export default CitizenPortal;
