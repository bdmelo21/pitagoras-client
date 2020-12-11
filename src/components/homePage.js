import React, { Component } from "react";
import "bulma/css/bulma.css";
import MyComponents from "./Map";
import StarsRating from "stars-rating";
import SearchBar from "./SearchBar";
import ZoomClass from "../utils/Zoom";
import SendCords from "../utils/sendCords";
import LoadingFunctionComponent from "./LoadingComponent";
import SubjectTable from "./subjectTable";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class HomePage extends Component {
  state = {
    studentRate: null,
    rating: null,
    initialize: false,
    zoomstudent: false,
    stars: false,
    zoomisok: false,
    clearCounter: false,
    id: null,
    afterload: false,
    reload: false,
    waiting: "waiting",
    loggedInUser: this.props.loggedInUser,
    chosenteacher: null,
    online: false,
    subjects: [],
    filteredSubjects: null,
    clearMyInterval: false,
    isteacher: "",
    lat: 0,
    lng: 0,
    filterQuery: "",
    foundUser: null,
    foundUserCard: false,
    zoomLink: null,
    passwordzoomLink: null,
    waitingzoom: false,
    viewteachersandnotreload: false,
  };
  intervalIDUser = 0;
  intervalIDTeacher = 0;
  intervalIDZoom = 0;
  componentDidMount() {
    const sendCords = new SendCords();
    let newArrayofSubjects = [];
    sendCords.getAllTeachers().then((response) => {
      response.data.map((element) => {
        return newArrayofSubjects.push(element.subject);
      });
    });
    this.setState({
      subjects: newArrayofSubjects,
    });
  }
  teacherTimeforRates() {
    return setTimeout(() => {
      this.setState({
        stars: true,
      });
    }, 5000);
  }
  ratingFunction() {
    this.teacherTimeforRates();
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      });
    });
  }
  SendCoordstoDb = (event) => {
    event.preventDefault();
    const sendCords = new SendCords();
    sendCords
      .TeacherwithCoords(
        this.state.lat,
        this.state.lng,
        this.props.loggedInUser.firstname,
        this.props.loggedInUser.lastname,
        this.props.loggedInUser.username,
        this.props.loggedInUser.subject,
        this.props.loggedInUser.pricehour,
        this.props.loggedInUser.email,
        this.props.loggedInUser.phonenumber,
        this.props.loggedInUser.info
      )
      .then((response) => {
        console.log(response);
        this.setState({
          id: response.data._id,
          reload: true,
          online: true,
        });
        this.getAvailableUser();
      });
  };
  getAvailableUser = () => {
    this.intervalIDUser = setInterval(() => {
      this.findTheUser();
    }, 5000);
  };
  getAvailableTeacher = () => {
    this.intervalIDTeacher = setInterval(() => {
      this.findTheTeacher();
    }, 5000);
  };

  findTheUser = () => {
    const sendCords = new SendCords();
    sendCords.getUser(this.props.loggedInUser.username).then((response) => {
      if (response.data.length > 0) {
        this.setState({
          foundUser: response,
          foundUserCard: true,
          waiting: "received",
          clearMyInterval: true,
          reload: false,
        });
        this.clearTheInterval();
      }
    });
  };
  clearTheInterval = (interval) => {
    clearInterval(interval);
  };
  changeStateInvalidRequest = () => {
    this.setState({
      clearCounter: true,
      zoomisok: true,
      foundUserCard: true,
    });
  };
  zoomTimeFunc = () => {
    this.intervalIDZoom = setInterval(() => {
      this.changeStateInvalidRequest();
    }, 60000);
  };
  clearValues = () => {
    if (this.state.clearCounter) {
      this.clearTheInterval(this.intervalIDZoom);
    }
    this.zoomTimeFunc();
  };
  findTheTeacher = () => {
    this.setState({
      reload: true,
      zoomstudent: true,
      viewteachersandnotreload: false,
    });
    const sendCords = new SendCords();
    sendCords
      .getthisAvailableTeacher(this.props.loggedInUser.username)
      .then((response) => {
        console.log("my response", response);
        if (response.data.length > 0) {
          this.clearTheInterval(this.intervalIDTeacher);
          this.setState({
            zoomLink: response.data[0].zoomlink,
            passwordzoomLink: response.data[0].zoompassword,
            waiting: "received",
            reload: false,
          });
          this.ratingFunction();
        } else if (this.state.clearCounter) {
          this.clearTheInterval(this.intervalIDTeacher);
        }
      });
  };
  sendZoomLinktoDb = () => {
    this.GetZoom();
  };
  GetRate = () => {
    this.intervalIDRate = setInterval(() => {
      this.findTheRate();
    }, 5000);
  };
  findTheRate = () => {
    const sendCords = new SendCords();
    sendCords
      .getRateBackEnd(this.props.loggedInUser.username)
      .then((response) => {
        console.log("my rate response", response);
        if (response.data.length > 0) {
          this.clearTheInterval(this.intervalIDRate);
          this.setState({
            studentRate: response.data[0].usernameStudent,
            rating: response.data[0].rating,
          });
          toast.success(
            `🤯 ${this.state.studentRate} just gave you ${this.state.rating} stars`
          );
        }
      });
  };
  GetZoom = () => {
    this.setState({
      online: true,
      reload: true,
      waitingzoom: true,
      foundUserCard: false,
    });
    const ZoomConst = new ZoomClass();
    ZoomConst.GetZoomId().then((response) => {
      ZoomConst.PostZoomLink(response.data.id).then((responseZoom) => {
        console.log(responseZoom);
        this.setState({
          zoomLink: responseZoom.data.join_url,
          passwordzoomLink: responseZoom.data.password,
          reload: false,
          foundUserCard: false,
        });
        this.SendZoomLinktoUser();
      });
    });
  };
  SendZoomLinktoUser = () => {
    const sendCords = new SendCords();
    sendCords
      .UpdateUserwithCoords(
        this.state.foundUser.data[0]._id,
        true,
        this.state.zoomLink,
        this.state.passwordzoomLink
      )
      .then((response) => {
        console.log("update response", response);
      });
    this.GetRate();
  };
  RemoveCoordstoDb = (event) => {
    event.preventDefault();
    const sendCords = new SendCords();
    sendCords.deleteTeacherwithCoords(this.state.id).then(() => {
      this.setState({
        foundUserCard: false,
        online: false,
        reload: false,
        id: "no-id",
      });
    });
    sendCords.deleteAllTeachewithCoords(this.state.loggedInUser.username);
    this.clearTheInterval();
  };
  rateSend = (rating) => {
    const sendCords = new SendCords();
    sendCords
      .sendRate(
        rating,
        this.props.loggedInUser.username,
        this.state.chosenteacher.username
      )
      .then(() => {
        this.setState({
          stars: false,
        });
        toast.success("⭐ Rating sent!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  SendUsertoDb = () => {
    const sendCords = new SendCords();
    sendCords
      .UserwithCoords(
        this.state.lat,
        this.state.lng,
        this.props.loggedInUser.username,
        this.state.chosenteacher.username,
        this.props.loggedInUser.email
      )
      .then((response) => {
        console.log(response);
        this.setState({
          online: true,
          id: response.data._id,
        });
        this.getAvailableTeacher();
        this.clearValues();
      });
  };
  showaTeacher = (filterQuery) => {
    //  console.log(filterQuery);
    this.setState({
      filterQuery: filterQuery,
    });
    const sendCords = new SendCords();
    let newArrayofChosenTeachers = [];
    sendCords.getAllTeachers().then((response) => {
      response.data.map((element) => {
        if (element.subject === this.state.filterQuery) {
          return newArrayofChosenTeachers.push(element);
        } else {
          return null;
        }
      });
      console.log(newArrayofChosenTeachers);
      let max = newArrayofChosenTeachers.length - 1;
      let newNumber = Math.floor(Math.random() * max);
      return this.setState({
        newNumber: newNumber,
        teachers: newArrayofChosenTeachers,
        chosenteacher: newArrayofChosenTeachers[newNumber],
        viewteachersandnotreload: true,
      });
    });
  };
  removeATeacher = (event) => {
    event.preventDefault();
    let newArrayofTeachers = [...this.state.teachers];
    newArrayofTeachers.splice(this.state.newNumber, 1);
    this.setState({
      chosenteacher: null,
      teachers: newArrayofTeachers,
      newNumber: null,
    });
    if (newArrayofTeachers.length > 0) {
      let max = newArrayofTeachers.length;

      let newIndex = Math.floor(Math.random() * max);
      return this.setState({
        newNumber: newIndex,
        chosenteacher: newArrayofTeachers[newIndex],
      });
    } else {
      this.setState({
        teachers: "no more teachers",
      });
    }
  };
  handleFilterProducts = (query) => {
    let visibleSubjects = [...this.state.subjects].filter((subject) => {
      return subject.toLowerCase().includes(query.searchQuery.toLowerCase());
    });
    this.setState({
      filteredSubjects: visibleSubjects,
    });
  };
  render() {
    if (this.props.isteacher) {
      //Teacher vai ter post
      return (
        <div className="home-page-div">
          <MyComponents></MyComponents>
          <ToastContainer />
          {!this.state.online ? (
            <div className="available-button-teacher">
              <form onSubmit={this.SendCoordstoDb}>
                <button class="button is-success">
                  Be Available to Requests
                </button>
              </form>
            </div>
          ) : (
            <form onSubmit={this.RemoveCoordstoDb}>
              <div className="available-button-teacher">
                <button class="button is-danger">
                  Stop Being Available to Requests
                </button>
              </div>
            </form>
          )}
          <hr></hr>
          {this.state.foundUserCard && this.state.online ? (
            <div className="card-bulmaTeacher content-center">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">
                        {this.state.foundUser.data[0].usernameStudent}
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    {this.state.foundUser.data[0].email}
                    <br></br>
                    <br></br>
                    <button
                      class="button is-info"
                      onClick={this.sendZoomLinktoDb}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {this.state.reload && !this.state.foundUserCard ? (
            <div className="sweet-loading-student">
              <div className="sweet-loading">
                <ClipLoader
                  size={100}
                  color={"#009356"}
                  loading={this.state.loading}
                />
              </div>
              {this.state.reload && !this.state.waitingzoom ? (
                <h1 className="h1-findingastudent">
                  Finding a Student. Just wait a few seconds...
                </h1>
              ) : (
                <h1 className="h1-findingastudent">
                  Requesting a Zoom link. Just wait a few seconds...
                </h1>
              )}
            </div>
          ) : null}
          {this.state.zoomLink ? (
            <div>
              <div className="card-bulmaTeacher">
                <div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <a href={this.state.zoomLink} class="title is-4">
                          Here's your Zoom Meeting
                        </a>
                      </div>
                    </div>
                    <div class="content">
                      <p>
                        <strong>
                          Student:{" "}
                          {this.state.foundUser.data[0].usernameStudent}
                        </strong>
                      </p>
                      <strong>password: {this.state.passwordzoomLink}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    } else {
      //Student vai ter get
      return (
        <div className="home-page-div">
          <ToastContainer />
          <MyComponents getTeachers={true}></MyComponents>
          <hr></hr>
          <SearchBar onFilter={this.handleFilterProducts}></SearchBar>
          {this.state.filteredSubjects ? (
            <SubjectTable
              filteredSubjects={this.state.filteredSubjects}
              filterTeacher={this.showaTeacher}
            />
          ) : null}
          {this.state.chosenteacher && this.state.viewteachersandnotreload ? (
            <div className="card-bulma content-center">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                          alt="Placeholder"
                        ></img>
                      </figure>
                    </div>
                    <div class="media-content">
                      <h1 className="h1-card-student">
                        {this.state.chosenteacher.firstname}{" "}
                        {this.state.chosenteacher.lastname}
                      </h1>
                      <p class="subtitle is-6">
                        {this.state.chosenteacher.subject}
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    {this.state.chosenteacher.info}
                    <br></br>
                    <p>
                      {" "}
                      <strong>phone:</strong>
                      {this.state.chosenteacher.phonenumber}
                      <br></br>
                      <strong>email:</strong>
                      {this.state.chosenteacher.email}
                      <br></br>
                      <strong>Price:</strong>
                      {this.state.chosenteacher.pricehour}€/h
                    </p>
                    <div className="buttons">
                      <div class="div-button-card">
                        <button
                          class="button is-info"
                          onClick={this.SendUsertoDb}
                        >
                          Zoom Call
                        </button>
                      </div>
                      <div class="div-button-card">
                        <button
                          class="button is-danger"
                          onClick={this.removeATeacher}
                        >
                          Nope
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {this.state.reload && !this.state.foundUserCard ? (
            <div>
              <div className="sweet-loading-student">
                <ClipLoader
                  size={100}
                  color={"#009356"}
                  loading={this.state.loading}
                />
              </div>
              {this.state.reload && this.state.zoomstudent ? (
                <h1 className="h1-findingastudent-student">
                  Waiting to be Accepted by your Teacher. Just wait a few
                  seconds...
                </h1>
              ) : null}
            </div>
          ) : null}
          {this.state.reload &&
          this.state.clearCounter &&
          this.state.zoomisok ? (
            <h1 className="h1-findingastudent-student-invalid">
              Request Time has expired. Please Try again.
            </h1>
          ) : null}
          {this.state.zoomLink ? (
            <div>
              <div className="card-bulma content-center">
                <div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <a href={this.state.zoomLink} class="title is-4">
                          Here's your Zoom Meeting
                        </a>
                      </div>
                    </div>
                    <div class="content">
                      <p>
                        <strong>
                          Teacher: {this.state.chosenteacher.username}
                        </strong>
                      </p>
                      <strong>password: {this.state.passwordzoomLink}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {this.state.stars ? (
            <div className="stars">
              <StarsRating
                count={5}
                onChange={this.rateSend}
                size={80}
                color2={"#ffd700"}
              />
              <h1 className="h1-findingastudent-student-stars">
                Rate teacherjoao's class
              </h1>
            </div>
          ) : null}
        </div>
      );
    }
  }
}
export default HomePage;
