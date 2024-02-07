import React from 'react';
import LeftNavigatorAdminList from '../../Navigator/LeftNavigatorAdminList';
import BarChart from '../../BaladiyaAgent/Home/BarChart';
import './Home.css';

const AdminHome = () => {
  return (
    <div className="home-container">
    <div className="sidebar">
      <LeftNavigatorAdminList/>
    </div>
    <div className="main-content">
      <BarChart/>
    </div>
    <div className="footer">
      Footer
    </div>
  </div>
  );
}

export default AdminHome;