import axios from "axios";
class SendCords {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}/api`,
      //send authenticated encrypted info back to the server
      withCredentials: true,
    });
    this.service = service;
  }
  getTeacher(id) {
    return this.service.get(`/teacher/${id}`);
  }
  TeacherwithCoords = (
    lat,
    lng,
    firstname,
    lastname,
    username,
    subject,
    pricehour,
    email,
    phonenumber,
    info
  ) => {
    return this.service.post(`/availableteacher`, {
      lat,
      lng,
      firstname,
      lastname,
      username,
      subject,
      pricehour,
      email,
      phonenumber,
      info,
    });
  };
  UserwithCoords = (lat, lng, username, teacher, email) => {
    return this.service.post(`/availableuser`, {
      lat,
      lng,
      username,
      teacher,
      email,
    });
  };
  deleteTeacherwithCoords(id) {
    return this.service.delete(`/deleteteacher/${id}`);
  }
  getAllTeachers() {
    return this.service.get("/allteachers");
  }
  getUser(username) {
    return this.service.get(`/allusersavailable/${username}`);
  }
  getthisAvailableTeacher(username) {
    return this.service.get(`/allteachersavailable/${username}`);
  }
  deleteAllTeachewithCoords(username) {
    return this.service.delete(`/deleteallteachersavailable/${username}`);
  }
  UpdateUserwithCoords(id, accept, zoomlink, zoompassword) {
    return this.service.put(`/updateavailableuser/${id}`, {
      accept,
      zoomlink,
      zoompassword,
    });
  }
  sendRate(rating, usernameStudent, usernameTeacher) {
    return this.service.post(`/updatedteacherrate/${rating}`, {
      usernameStudent,
      usernameTeacher,
    });
  }
  getRateBackEnd(username) {
    return this.service.get(`/ratings/${username}`);
  }
}

export default SendCords;
