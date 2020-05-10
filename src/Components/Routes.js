import React from "react";
import PropTypes from "prop-types";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import EditProfile from "../Routes/EditProfile";
import Search from "../Routes/Search";
import Post from "../Routes/Post";
import Notifications from "../Routes/Notifications";

const LoggedInRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Feed}></Route>
      <Route path="/notifications" component={Notifications} />
      <Route path="/explore" component={Explore} />
      <Route path="/editProfile" component={EditProfile} />
      <Route path="/search" component={Search} />
      <Route path="/postId" component={Post} />
      <Route path="/:username" component={Profile} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);

const LoggedoutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedoutRoutes />;

AppRouter.protoTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
