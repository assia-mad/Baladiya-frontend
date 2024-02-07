import React from 'react';
import Drawer from '@mui/material/Drawer';
import LeftNavigatorList from './LeftNavigatorList';
import LeftNavigatorAdminList from './LeftNavigatorAdminList'; 
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CollapsibleLeftNavigator = ({ isOpen, toggleDrawer, userRole }) => {
  const handleDrawerClick = (event) => {
    event.stopPropagation(); 
  };

  return (
    <Drawer open={isOpen} onClose={toggleDrawer(false)}>
      <div
        role="presentation"
        onClick={handleDrawerClick}
        onKeyDown={handleDrawerClick}
      >
        {userRole === 'Admin' ? (
          <LeftNavigatorAdminList />
        ) : (
          <LeftNavigatorList />
        )}
        {/* <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton> */}
      </div>
    </Drawer>
  );
};

export default CollapsibleLeftNavigator;
