import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import Profile from "./components/Profile";
import Login from "./Login";
import { withAuth0 } from "@auth0/auth0-react";
class App extends React.Component {
  render() {
    console.log("app", this.props);
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/fav">
              <Favorite />
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route>
            <Route exact path="/profile">
              <Profile />
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <Home /> : <Login />}
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
