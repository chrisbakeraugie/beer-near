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
            <h2>About Beer-Near</h2>
            <h5>The general purpose of beer near is that Alex is garbage at FIFA an he knows it.</h5>
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
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
