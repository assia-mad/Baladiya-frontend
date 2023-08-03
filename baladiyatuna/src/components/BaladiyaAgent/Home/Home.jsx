import React from "react";
import LeftNavigatorList from "../../Navigator/LeftNAvigatorList";
import './Home.css';

const Home = () => {

    return(
        <div>
        <LeftNavigatorList/>
        Home
        Footer
        <div className="main-content">
          <p>This is another component with the fixed sidebar.</p>
        </div>
      </div>
    );
}

export default Home;