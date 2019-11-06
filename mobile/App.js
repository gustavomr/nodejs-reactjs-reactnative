import React from "react";
import Routes from "./src/routes";
import NavigationService from "./src/services/NavigationService";

export default function App() {
  return (
    <Routes
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    ></Routes>
  );
}
