import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./containers/HomePage";
import BarChartPage from "./containers/BarChartPage";
import LollipopChartPage from "./containers/LollipopChartPage";
import AboutPage from "./containers/AboutPage";
import NotFound from "./containers/NotFound";

export default () => (
  <Router>
    <div className="mainContainer">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/barchart" component={BarChartPage} />
        <Route exact path="/lollipopchart" component={LollipopChartPage} />
        <Route exact path="/aboutus" component={AboutPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
