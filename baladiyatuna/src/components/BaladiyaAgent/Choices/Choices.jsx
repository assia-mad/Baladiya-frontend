import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apiInstance from '../../../../API';
import PrimaryColorText from '../../Tools/Title';

const SurveyChoice = ({ choice }) => {
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const { t } = useTranslation(); 

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  const fetchUsers = async () => {
    try {
      if (showUsers && choice.voted_by.length > 0) {
        const userPromises = choice.voted_by.map(async (userId) => {
          const response = await apiInstance.get(`/manage_users/${userId}/`); 
          const userData = response; 
          return userData;
        });

        const userResults = await Promise.all(userPromises);
        setUsers(userResults);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {

    fetchUsers();
  }, [showUsers, choice.voted_by]);

  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6">{choice.name}</Typography>
        <List>
          {showUsers &&
            users.map((user) => (
              <ListItem key={user.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.first_name} ${user.last_name}`}
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
        {choice.voted_by.length > 0 && (
          <div>
            <Divider />
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}
            >
              {`${choice.voted_by.length} ${
                choice.voted_by.length === 1 ? t('utilisateur') : t('utilisateurs')
              } ${t("ont voté pour ce choix")}`}
              <IconButton onClick={toggleUsers}>
                {showUsers ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ChoicesList = ({ choices }) => {
    const { t } = useTranslation();
  return (
    <div>
      <PrimaryColorText className="title" gutterBottom>
        {t("Choix")}
      </PrimaryColorText>
      {choices.map((choice) => (
        <SurveyChoice key={choice.id} choice={choice} />
      ))}
    </div>
  );
};

export default ChoicesList;
