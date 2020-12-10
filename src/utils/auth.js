import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}`,
      //send authenticated encrypted info back to the server
      withCredentials: true,
    });
    this.service = service;
  }
  signup = (username, password, email) => {
    return this.service.post("/pitagoras/signup", {
      username,
      password,
      email,
    });
  };
  login = (username, password) => {
    return this.service.post("/pitagoras/login", { username, password });
  };
  teacherlogin = (username, password) => {
    return this.service.post("/pitagoras/teacherlogin", { username, password });
  };
  logout = () => {
    return this.service.post("/pitagoras/logout");
  };
  loggedin = () => {
    return this.service.get("/pitagoras/loggedin");
  };
  signupTeacher = (
    firstname,
    lastname,
    username,
    address,
    password,
    email,
    phonenumber,
    subject,
    pricehour,
    info,
    creditcard
  ) => {
    return this.service.post("/pitagoras/teacherinfo", {
      firstname,
      lastname,
      username,
      address,
      password,
      email,
      phonenumber,
      subject,
      pricehour,
      info,
      creditcard,
    });
  };
}
export default AuthService;
