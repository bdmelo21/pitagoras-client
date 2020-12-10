import axios from "axios";
class SendCords {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}`,
      //send authenticated encrypted info back to the server
      withCredentials: true,
    });
    this.service = service;
  }
  getTeacher(id) {
    return this.service.get(`/dashboard/teacher/${id}`);
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
    return this.service.post(`/dashboard/availableteacher`, {
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
    return this.service.post(`/dashboard/availableuser`, {
      lat,
      lng,
      username,
      teacher,
      email,
    });
  };
  deleteTeacherwithCoords(id) {
    return this.service.delete(`/dashboard/deleteteacher/${id}`);
  }
  getAllTeachers() {
    return this.service.get("/dashboard/allteachers");
  }
  getUser(username) {
    return this.service.get(`/dashboard/allusersavailable/${username}`);
  }
  getthisAvailableTeacher(username) {
    return this.service.get(`/dashboard/allteachersavailable/${username}`);
  }
  deleteAllTeachewithCoords(username) {
    return this.service.delete(
      `/dashboard/deleteallteachersavailable/${username}`
    );
  }
  UpdateUserwithCoords(id, accept, zoomlink, zoompassword) {
    return this.service.put(`/dashboard/updateavailableuser/${id}`, {
      accept,
      zoomlink,
      zoompassword,
    });
  }
}

export default SendCords;
