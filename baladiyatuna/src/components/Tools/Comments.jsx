import React, { useState } from 'react';
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
    const [owner, setOwner] = useState(null);

    const getOwnerName = async (id) => {
        try{
            const response = await apiInstance.get(`manage_users/${id}/`);
            return response?.name;
        }catch(error){
            console.log("erreeur",error);
        }
    };

    const uploadOwnerImage = async (id) => {
        try{
            const response = await apiInstance.get(`manage_users/${id}/`);
            return response?.image;           
        }catch(error){
            console.log("erreur",error);
        }
    };

  return (
    <StyledPaper elevation={2}>
      <Box display="flex" alignItems="center">
        <Avatar src={uploadOwnerImage(comment.owner)} alt={`Avatar`} />
        <Box ml={2}>
          <Typography variant="subtitle1">{getOwnerName(comment.owner)}</Typography>
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
