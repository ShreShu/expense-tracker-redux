import React, { useContext } from "react";
import AuthContext from "../Store/AuthContext";
import { NavLink } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.tokenId);
  return (
    <div className="home__page">
      <div>Welcome to expense Tracker</div>
      <div>
        your profile is incomplete{" "}
        <NavLink to="/updateprofile"> Complete Now</NavLink>
      </div>
    </div>
  );
};

export default HomePage;