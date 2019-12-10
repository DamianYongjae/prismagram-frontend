import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";

const LoggedInRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Feed}></Route>
      <Route path="/explore" component={Explore} />
      <Route path="/search" component={Search} />
      <Route path="/:username" component={Profile} />
    </Switch>
  </Router>
);

const LoggedoutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedoutRoutes />;

AppRouter.protoTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
