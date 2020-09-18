import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./containers/ProductList";
import AboutPage from "./containers/AboutPage";
import DetailsPage from "./containers/DetailsPage";
import NotFound from "./containers/NotFound";

export default () => (
  <Router>
    <div className="mainContainer">
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/details/:productId" component={DetailsPage} />
        <Route exact path="/aboutus" component={AboutPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
