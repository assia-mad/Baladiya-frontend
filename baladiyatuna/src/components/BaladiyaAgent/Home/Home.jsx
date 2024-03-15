import React, { useTransition } from 'react';
import LeftNavigatorList from "../../Navigator/LeftNavigatorList";
import BarChart from './BarChart';
import './Home.css';
import { Box } from '@mui/material';

const Home = () => {

  return (
    <div className="home-container">
      <div className="sidebar">
        <LeftNavigatorList/>
      </div>
      <Box className="main-content" mt={8} >
        <BarChart />
      </Box>
      <div className="footer">
        Footer
      </div>
    </div>
  );
}

export default Home;
