import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}/api`,
      //send authenticated encrypted info back to the server
      withCredentials: true,
    });
    this.service = service;
  }
  signup = (username, password, email) => {
    return this.service.post("/signup", {
      username,
      password,
      email,
    });
  };
  login = (username, password) => {
    return this.service.post("/login", { username, password });
  };
  teacherlogin = (username, password) => {
    return this.service.post("/teacherlogin", { username, password });
  };
  logout = () => {
    return this.service.post("/logout");
  };
  loggedin = () => {
    return this.service.get("/loggedin");
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
    return this.service.post("/teacherinfo", {
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
