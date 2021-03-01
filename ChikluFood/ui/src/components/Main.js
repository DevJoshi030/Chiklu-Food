import React from "react";
import { render } from "react-dom";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Main = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/menu/:Restname" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

const appDiv = document.getElementById("app");
render(<Main />, appDiv);

export default Main;
