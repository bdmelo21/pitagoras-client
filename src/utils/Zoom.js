import axios from "axios";
class ZoomClass {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}/api`,
      //send authenticated encrypted info back to the server
      withCredentials: true,
    });
    this.service = service;
  }
  AuthZoom() {
    return this.service.post("/zoom-auth");
  }
  GetZoomId = () => {
    return this.service.get(`/zoom-getid`);
  };
  PostZoomLink = (token, zoomID) => {
    return this.service.post("/zoom-postmeeting", { token, zoomID });
  };
}
export default ZoomClass;
