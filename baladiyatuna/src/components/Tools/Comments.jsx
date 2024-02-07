import React, { useState, useEffect } from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';
import styled from '@emotion/styled';
import apiInstance from '../../../API';
import { CollectionsBookmark } from '@mui/icons-material';

const StyledPaper = styled(Paper)({
  padding: '10px',
  marginBottom: '10px',
});
const StyledTypography = styled(Typography)({
  marginTop: '10px',
});

const Comment = ({ comment }) => {
  const [ownerName, setOwnerName] = useState(null);
  const [ownerImage, setOwnerImage] = useState(null);

  const fetchOwnerData = async () => {
    try {
      const ownerResponse = await apiInstance.get(`manage_users/${comment.owner}/`);
      setOwnerName(`${ownerResponse?.first_name} ${ownerResponse?.last_name}`);
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",ownerResponse.first_name);
      setOwnerImage(ownerResponse?.image);
    } catch (error) {
      console.error('Error fetching owner data', error);
    }
  };

  useEffect(() => {
    fetchOwnerData();
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

const CommentsList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
