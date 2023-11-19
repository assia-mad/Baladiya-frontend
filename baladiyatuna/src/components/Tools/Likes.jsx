import React, { useState, useEffect } from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
import styled from '@emotion/styled';
import apiInstance from '../../../API';

const StyledPaper = styled(Paper)({
  padding: '10px',
  marginBottom: '10px',
  marginTop:'20px',
  maxWidth: '450px', 
  // margin: '0 auto', 
});

const StyledTypography = styled(Typography)({
  marginTop: '10px',
});

const LikedByListItem = ({ likedByUserId }) => {
  const [likedByUser, setLikedByUser] = useState(null);

  useEffect(() => {
    const fetchLikedByUserData = async () => {
      try {
        const response = await apiInstance.get(`manage_users/${likedByUserId}/`);
        setLikedByUser(response);
      } catch (error) {
        console.log('Error fetching likedBy user data', error);
      }
    };

    fetchLikedByUserData();
  }, [likedByUserId]);

  return (
    <StyledPaper elevation={2}>
      {likedByUser && (
        <Box display="flex" alignItems="center">
          <Avatar
            src={likedByUser.image}
            alt={`Avatar of ${likedByUser.first_name} ${likedByUser.last_name}`}
          />
          <Box ml={2}>
            <StyledTypography variant="subtitle1">
              {`${likedByUser.first_name} ${likedByUser.last_name}`}
            </StyledTypography>
          </Box>
        </Box>
      )}
    </StyledPaper>
  );
};

const LikedByList = ({ likedByList }) => {
  return (
    <div>
      {likedByList.map((likedByUserId, index) => (
        <LikedByListItem key={index} likedByUserId={likedByUserId} />
      ))}
    </div>
  );
};

export default LikedByList;
