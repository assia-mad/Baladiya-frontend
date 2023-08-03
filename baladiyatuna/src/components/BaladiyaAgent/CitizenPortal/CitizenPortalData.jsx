import React from 'react';
import SportsIcon from '@mui/icons-material/Sports';
import GavelIcon from '@mui/icons-material/Gavel';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HearingIcon from '@mui/icons-material/Hearing';
import MuseumIcon from '@mui/icons-material/Museum';
import { useNavigate } from 'react-router-dom';
import CitizenPortal from './CitizenPortal';
import { useTranslation } from 'react-i18next';

const CitizenPortalData = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cardDatalist = [
    { title: t('Espace sportif'), icon: <SportsIcon fontSize="large" />, onClick: () => navigate("/sport_topics") },
    { title: t('Espace politique'), icon: <GavelIcon fontSize="large" /> },
    { title: t('Espace social'), icon: <PeopleIcon fontSize="large" /> },
    { title: t('Espace écologique'), icon: <PeopleIcon fontSize="large" /> },
    { title: t('Espace économique'), icon: <MonetizationOnIcon fontSize="large" /> },
    { title: t('Espace e-commercial'), icon: <StorefrontIcon fontSize="large" /> },
    { title: t('Espace audience'), icon: <HearingIcon fontSize="large" /> },
    { title: t('Espace culturel'), icon: <MuseumIcon fontSize="large" /> },
  ];

  return <CitizenPortal cardData={cardDatalist} />;
};

export default CitizenPortalData;
