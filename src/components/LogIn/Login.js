import React from "react";
import AuthService from "../../utils/auth";
import { Link, withRouter } from "react-router-dom";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from "./SignUpElements";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };
  handleChange = (event) => {
    let { name, value, type } = event.target;
    if (type === "checkbox") {
      value = event.target.checked;
    }
    this.setState({ [name]: value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const authService = new AuthService();
    authService.login(username, password).then((response) => {
      this.props.setCurrentUser(response.data);
      localStorage.setItem("loggedInUser", response.data._id);
      this.props.history.push("/dashboard");
    });
  };
  render() {
    return (
      <>
        <Container>
          <FormWrap>
            <FormContent>
              <Form onSubmit={this.handleFormSubmit}>
                <FormLabel>Username:</FormLabel>
                <FormInput
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <FormLabel>Password:</FormLabel>
                <FormInput
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <FormButton type="submit">Login</FormButton>
                <Text>
                  Don't have account?
                  <Link to={"/signup"}> Signup</Link>
                </Text>
              </Form>
            </FormContent>
          </FormWrap>
        </Container>
      </>
    );
  }
}
export default withRouter(Login);
