import axios from "axios";
class ZoomClass {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}`,
      //send authenticated encrypted info back to the server
      withCredentials: true,
    });
    this.service = service;
  }
  AuthZoom() {
    return this.service.post("/zoom/zoom-auth");
  }
  GetZoomId = () => {
    return this.service.get(`/zoom/zoom-getid`);
  };
  PostZoomLink = (token, zoomID) => {
    return this.service.post("/zoom/zoom-postmeeting", { token, zoomID });
  };
}
export default ZoomClass;
