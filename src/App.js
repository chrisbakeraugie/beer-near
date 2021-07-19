/* eslint-disable react/prop-types */
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BeerNear from "./BeerNear";
import "./bootstrap.css";
import About from "./About";



function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ul className="nav nav-tabs justify-content-center" style={{ margin: "5px" }}>
            <Link to="/" className="nav-link">Find me a beer</Link>
            <Link to="/about" className="nav-link">About this app</Link>
          </ul>
        </div>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <BeerNear />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
