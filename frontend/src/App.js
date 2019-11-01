import React, { useState } from "react";
import logo from "./assets/logo.svg";
import Routes from "./routes";
import "./App.css";
import Logout from "../src/pages/Logout";
const App = () => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem(process.env.REACT_APP_TOKEN_KEY) !== null
  );

  const changeLogStatus = () => {
    if (isLogged) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  };
  return (
    <div className="container">
      <img src={logo} alt="AirCNC" />
      <div className="content">
        <Routes changeStatus={changeLogStatus} />
        <Logout isLogged={isLogged} changeStatus={changeLogStatus} />
      </div>
    </div>
  );
};

export default App;
