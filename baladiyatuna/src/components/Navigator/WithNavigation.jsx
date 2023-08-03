import React from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./Navigator";
import SimpleNavigator from "./SimpleNavigator";

const WithNavigation = (Component, showSimpleNavigator) => {
    return (props) => {
      const location = useLocation();
      const showNavigationBar = location.pathname !== '/register' && location.pathname !== '/';
  
      return (
        <div>
          {showNavigationBar && <NavigationBar />}
          {showSimpleNavigator && !showNavigationBar && <SimpleNavigator />}
          <Component {...props} />
        </div>
      );
    };
  };

export default WithNavigation;