import React from "react";
import { Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalculatePage from "./components/CalculatePage";
import GetPage from "./components/GetPage";
import Navigation from "./components/Navigation";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navigation />
      <GetPage />
      <CalculatePage />
    </>
  );
};

export default App;
