import React from 'react';
import LeftNavigatorList from "../../Navigator/LeftNavigatorList";
import BarChart from './BarChart';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="sidebar">
        <LeftNavigatorList/>
      </div>
      <div className="main-content">
        <BarChart />
      </div>
      <div className="footer">
        Footer
      </div>
    </div>
  );
}

export default Home;
