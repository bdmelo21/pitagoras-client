import React from "react";
import "react-phone-number-input/style.css";
import AuthService from "../../utils/auth";
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

class TeacherInfo extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    address: "",
    password: "",
    email: "",
    phonenumber: "",
    subject: "Português 1ºCiclo",
    info: "",
    pricehour: 0,
    creditcard: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const authService = new AuthService();
    authService
      .signupTeacher(
        this.state.firstname,
        this.state.lastname,
        this.state.username,
        this.state.address,
        this.state.password,
        this.state.email,
        this.state.phonenumber,
        this.state.subject,
        this.state.pricehour,
        this.state.info,
        this.state.creditcard
      )
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
              <FormH1>
                Thank you for supporting this app. We need some informations for
                you to start teaching
              </FormH1>
              <Form onSubmit={this.handleFormSubmit}>
                <FormLabel>First Name:</FormLabel>
                <FormInput
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                ></FormInput>
                <FormLabel>Last Name:</FormLabel>
                <FormInput
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                ></FormInput>
                <FormLabel>Username:</FormLabel>
                <FormInput
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                ></FormInput>
                <FormLabel>Address:</FormLabel>
                <FormInput
                  type="text"
                  name="address"
                  value={this.state.address}
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
                <FormLabel>Phone Number</FormLabel>
                <FormInput
                  type="tel"
                  name="phonenumber"
                  maxLength="9"
                  placeholder="+351"
                  value={this.state.phonenumber}
                  onChange={this.handleChange}
                ></FormInput>
                <FormLabel>Subject</FormLabel>
                <select
                  name="subject"
                  value={this.state.subject}
                  onChange={this.handleChange}
                >
                  <option selected value={"Português 1ºCiclo"}>
                    Português 1ºCiclo
                  </option>
                  <option value={"Matemática 1ºCiclo"}>
                    {" "}
                    Matemática 1ºCiclo
                  </option>
                  <option value={"Estudo do Meio 1ºCiclo"}>
                    {" "}
                    Estudo do Meio 1ºCiclo
                  </option>
                  <option value={"Português 2ºCiclo"}>
                    {" "}
                    Português 2ºCiclo
                  </option>
                  <option value={"Matemática 2ºCiclo"}>
                    {" "}
                    Matemática 2ºCiclo
                  </option>
                  <option value={"Inglês 2ºCiclo"}> Inglês 2ºCiclo</option>
                  <option value={"História e Geografia de Portugal 2ºCiclo"}>
                    História e Geografia de Portugal 2ºCiclo
                  </option>
                  <option value={"Educação Visual 2ºCiclo"}>
                    {" "}
                    Educação Visual 2ºCiclo
                  </option>
                  <option value={"Educação Tecnológica 2ºCiclo"}>
                    Educação Tecnológica 2ºCiclo
                  </option>
                  <option value={"Educação Tecnológica 2ºCiclo"}>
                    Educação Musical 2ºCiclo
                  </option>
                  <option value={"Ciências Naturais 2ºCiclo"}>
                    Ciências Naturais 2ºCiclo
                  </option>
                  <option value={"Português 3ºCiclo"}>
                    {" "}
                    Português 3ºCiclo
                  </option>
                  <option value={"Inglês 3ºCiclo"}> Inglês 3ºCiclo</option>
                  <option value={"Francês 3ºCiclo"}> Francês 3ºCiclo</option>
                  <option value={"Espanhol 3ºCiclo"}> Espanhol 3ºCiclo</option>
                  <option value={"Matemática 3ºCiclo"}>
                    {" "}
                    Matemática 3ºCiclo
                  </option>
                  <option value={"História 3ºCiclo"}> História 3ºCiclo</option>
                  <option value={"Geografia 3ºCiclo"}>
                    {" "}
                    Geografia 3ºCiclo
                  </option>
                  <option value={"Ciências Fisico-Químicas 3ºCiclo"}>
                    Ciências Fisico-Químicas 3ºCiclo
                  </option>
                  <option value={"Ciências Naturais 3ºCiclo"}>
                    Ciências Naturais 3ºCiclo
                  </option>
                  <option value={"Educação Musical 3ºCiclo"}>
                    Educação Musical 3ºCiclo
                  </option>
                  <option value={"Educação Visual 3ºCiclo"}>
                    {" "}
                    Educação Visual 3ºCiclo
                  </option>
                  <option value={"Português Ensino Secundário"}>
                    Português Ensino Secundário
                  </option>
                  <option value={"Inglês Ensino Secundário"}>
                    Inglês Ensino Secundário
                  </option>
                  <option value={"Francês Ensino Secundário"}>
                    Francês Ensino Secundário
                  </option>
                  <option value={"Espanhol Ensino Secundário"}>
                    Espanhol Ensino Secundário
                  </option>
                  <option value={"Alemão Ensino Secundário"}>
                    Alemão Ensino Secundário
                  </option>
                  <option value={"Filosofia Ensino Secundário"}>
                    Filosofia Ensino Secundário
                  </option>
                  <option value={"Matemática A Ensino Secundário"}>
                    Matemática A Ensino Secundário
                  </option>
                  <option value={"Matemática B Ensino Secundário"}>
                    Matemática B Ensino Secundário
                  </option>
                  <option value={"Economia A Ensino Secundário"}>
                    Economia A Ensino Secundário
                  </option>
                  <option value={"Economia B Ensino Secundário"}>
                    Economia B Ensino Secundário
                  </option>
                  <option value={"Economia C 12ºAno"}>
                    {" "}
                    Economia C 12ºAno
                  </option>
                  <option value={"História A Ensino Secundário"}>
                    História A Ensino Secundário
                  </option>
                  <option value={"História B Ensino Secundário"}>
                    História B Ensino Secundário
                  </option>
                  <option value={"Geografia A Ensino Secundário"}>
                    Geografia A Ensino Secundário
                  </option>
                  <option value={"Geografia C 12ºAno"}>
                    {" "}
                    Geografia C 12ºAno
                  </option>
                  <option
                    value={
                      "Matemática Aplicada às Ciências Sociais Ensino Secundário"
                    }
                  >
                    Matemática Aplicada às Ciências Sociais Ensino Secundário
                  </option>
                  <option value={"Direito 12ºAno"}> Direito 12ºAno</option>
                  <option value={"Ciência Política 12ºAno"}>
                    {" "}
                    Ciência Política 12ºAno
                  </option>
                  <option value={"Fisico-Química A Ensino Secundário"}>
                    Fisico-Química A Ensino Secundário
                  </option>
                  <option value={" Fisico-Química B Ensino Secundário"}>
                    Fisico-Química B Ensino Secundário
                  </option>
                  <option value={"Biologia e Geologia Ensino Secundário"}>
                    Biologia e Geologia Ensino Secundário
                  </option>
                  <option value={"Geometria Descritiva A Ensino Secundário"}>
                    Geometria Descritiva A Ensino Secundário
                  </option>
                  <option value={"Biologia A 12ºAno"}>
                    {" "}
                    Biologia A 12ºAno
                  </option>
                  <option value={"Aplicações Informáticas 12ºAno"}>
                    Aplicações Informáticas 12ºAno
                  </option>
                  <option value={"Psicologia B 12ºAno"}>
                    {" "}
                    Psicologia B 12ºAno
                  </option>
                  <option value={"Desenho A Ensino Secundário"}>
                    Desenho A Ensino Secundário
                  </option>
                  <option
                    value={"História e Cultura das Artes Ensino Secundário"}
                  >
                    História e Cultura das Artes Ensino Secundário
                  </option>
                  <option value={"Oficina das Artes 12ºAno"}>
                    Oficina das Artes 12ºAno
                  </option>
                  <option value={"Materiais e Tecnologias 12ºAno"}>
                    Materiais e Tecnologias 12ºAno
                  </option>
                </select>
                <br></br>
                <label>Class Price</label>
                <input
                  type="number"
                  name="pricehour"
                  min="0"
                  value={this.state.pricehour}
                  onChange={this.handleChange}
                ></input>
                <span class="unit">€/hour</span>
                <br></br>
                <label>Some info about your teachings</label>
                <input
                  type="text"
                  size="150"
                  name="info"
                  maxLength="360"
                  placeholder="e.g.: Professor com 20 anos de experiência. Bastante experiente em Geometria, Trigonometria e Derivadas"
                  value={this.state.info}
                  onChange={this.handleChange}
                ></input>
                <br></br>
                <label>CreditCard Number</label>
                <input
                  type="text"
                  name="creditcard"
                  value={this.state.creditcard}
                  onChange={this.handleChange}
                ></input>
                <p>
                  Please notice that Pitagoras does its payments on every
                  wednesday. By this reason, you may face some delays receiving
                  the payment of your teachings.
                </p>
                <button>Create</button>
              </Form>
            </FormContent>
          </FormWrap>
        </Container>
      </>
    );
  }
}

export default TeacherInfo;
