/* eslint-disable react/prop-types */
import "./App.css";
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
            <li className="nav-link"><Link to="/about">About this app</Link></li>
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
