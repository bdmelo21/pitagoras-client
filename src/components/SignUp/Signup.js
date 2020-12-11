import React from "react";
import AuthService from "../../utils/auth";
import { Link, withRouter } from "react-router-dom";
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from "./SignUpElements";
class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const authService = new AuthService();
    authService
      .signup(this.state.username, this.state.password, this.state.email)
      .then(() => {
        this.props.history.push("/login");
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
                ></FormInput>
                <FormLabel>E-mail:</FormLabel>
                <FormInput
                  type="e-mail"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                ></FormInput>
                <FormLabel>Password:</FormLabel>
                <FormInput
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                ></FormInput>
                <FormButton>Submit</FormButton>
                <Text>
                  Already have account?
                  <Link to={"/login"}> Login</Link>
                  <br></br>
                  Are you a teacher?
                  <Link to={"/teacherinfo"}> Register here</Link>
                </Text>
              </Form>
            </FormContent>
          </FormWrap>
        </Container>
      </>
    );
  }
}
export default withRouter(Signup);
