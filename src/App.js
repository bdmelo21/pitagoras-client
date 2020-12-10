import "./App.css";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import React from "react";
import Login from "./components/LogIn/Login";
import AuthService from "./utils/auth";
import Signup from "./components/SignUp/Signup";
import Layout from "./components/layoutPage";
import NavBar from "./components/NavBar";
import TeacherInfo from "./components/TeacherSignUp/teacherInfo";
import HomePage from "./components/homePage";

class App extends React.Component {
  state = {
    loggedInUser: null,
    isteacher: null,
  };
  setCurrentUser = (user) => {
    if (user) {
      this.setState({
        loggedInUser: user,
        isteacher: user.isteacher,
      });
    } else {
      this.setState({
        loggedInUser: user,
        isteacher: null,
      });
    }
  };
  componentDidMount() {
    if (this.state.loggedInUser === null) {
      const authService = new AuthService();
      //check if the user session is still active on the server
      authService.loggedin().then((response) => {
        if (response.data._id) {
          //theres a user session active then set the state
          //with the current user
          this.setCurrentUser(response.data);
          localStorage.setItem("loggedInUser", response.data._id);
        } else {
          localStorage.removeItem("loggedInUser");
        }
      });
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar
            loggedInUser={this.state.loggedInUser}
            setCurrentUser={this.setCurrentUser}
          />
          <Switch>
            <Route exact path="/" component={Layout} />
            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <HomePage
                  {...props}
                  loggedInUser={this.state.loggedInUser}
                  isteacher={this.state.isteacher}
                />
              )}
            />
            <Route path="/signup" component={Signup} />
            <Route
              exact
              path="/login"
              render={() => {
                return <Login setCurrentUser={this.setCurrentUser} />;
              }}
            />
            <Route
              exact
              path="/login-google"
              render={() => {
                window.location.href = `${process.env.REACT_APP_PROJECTS_API}/api/auth/google`;
              }}
            />
            <Route exact path="/teacherinfo" component={TeacherInfo} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
