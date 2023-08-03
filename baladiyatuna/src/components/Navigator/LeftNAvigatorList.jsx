import React from "react";
import Sidebar from "./LeftNavigator";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';

const LeftNavigatorList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const NavigateToManageCitoyen = () => {
        navigate('/manage_users');
    };

    const NavigateToCitizenPortal = () => {
        navigate('/citizen_portal');
    };

    const navigationItems = [
        { text: t('Gestion des utilisateurs'), icon: ManageAccountsIcon, onClick: NavigateToManageCitoyen }, 
        { text: t('Gestion portail citoyen'), icon: GroupIcon, onClick: NavigateToCitizenPortal },
    ];

    return <Sidebar navigationItems={navigationItems} />;
};

export default LeftNavigatorList;
