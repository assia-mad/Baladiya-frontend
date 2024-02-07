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
    { title: t('Espace politique'), icon: <GavelIcon fontSize="large" />,
      items: [
        { label: t('Formation'), path: '/formations' },
        { label: t('Accompagnement'), path: '/accompagnements' },
        { label: t('Discussion Politique'), path: '/discussions' },
        { label: t('Activité'), path: '/politic_activities' },
      ], },
    { title: t('Espace social'), icon: <PeopleIcon fontSize="large" />,
      items: [
        { label: t('Guide de Création'), path: '/creation_steps' },
        { label: t('Agenda'), path: '/agendas' },
        { label: t('Information'), path: '/social_informations' },
      ], },
    { title: t('Espace écologique'), icon: <PeopleIcon fontSize="large" />, onClick: () => navigate("/ecological_informations")},
    { title: t('Espace économique'), icon: <MonetizationOnIcon fontSize="large" />,
      items: [
        { label: t('Création micro Entreprise'), path: '/micro_entreprise_creation_steps' },
        { label: t('Fomation'), path: '/economic_formations' },
        { label: t('Patronat Local'), path: '/local_patronats' },
      ], },
    { title: t('Espace e-commercial'), icon: <StorefrontIcon fontSize="large" />, onClick: () => navigate("/products")},
    { title: t('Espace audience'), icon: <HearingIcon fontSize="large" />, onClick: () => navigate("/audience_demands")},
    { title: t('Espace culturel'), icon: <MuseumIcon fontSize="large" />, onClick: () => navigate("/cultural_topics")},
  ];

  return <CitizenPortal cardData={cardDatalist} />;
};

export default CitizenPortalData;
