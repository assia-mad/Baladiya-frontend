import React, { useState, useEffect } from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
import styled from '@emotion/styled'; 
import apiInstance from '../../../API';

const StyledPaper = styled(Paper)({
    padding:'10px',
    marginBottom:'10px',
});
const StyledTypography = styled(Typography)({
    marginTop:'10px',
});

const Comment = ({ comment }) => {
  const [ownerName, setOwnerName] = useState('');
  const [ownerImage, setOwnerImage] = useState('');

  useEffect(() => {
      async function fetchData() {
          try {
              const ownerResponse = await apiInstance.get(`manage_users/${comment.owner}/`);
              setOwnerName(ownerResponse.name);
              setOwnerImage(ownerResponse.image);
          } catch (error) {
              console.log("Error fetching owner data", error);
          }
      }

      fetchData();
  }, [comment.owner]);

  return (
      <StyledPaper elevation={2}>
          <Box display="flex" alignItems="center">
              <Avatar src={ownerImage} alt={`Avatar`} />
              <Box ml={2}>
                  <Typography variant="subtitle1">{ownerName}</Typography>
                  <Typography variant="body2">{comment.created_at}</Typography>
              </Box>
          </Box>
          <StyledTypography variant="body1">
              {comment.content}
          </StyledTypography>
      </StyledPaper>
  );
};
export default Comment;