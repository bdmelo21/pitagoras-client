import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import SendCords from "../utils/sendCords";
require("dotenv").config();

const containerStyle = {
  width: "100%",
  height: "350px",
};

class MyComponents extends React.Component {
  state = {
    lat: 0,
    lng: 0,
    arrayofTeachers: null,
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      });
    });
    if (this.props.getTeachers) {
      const sendCords = new SendCords();
      console.log("this is the response");
      sendCords.getAllTeachers().then((response) => {
        console.log("this is the response", response);
        this.setState({
          arrayofTeachers: response.data,
        });
      });
    }
  }
  render() {
    return (
      <div>
        <LoadScript //importante_ REACT//
          googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: this.state.lat, lng: this.state.lng }}
            zoom={5}
          >
            {this.state.arrayofTeachers
              ? this.state.arrayofTeachers.map((element) => {
                  return (
                    <Marker
                      position={{ lat: element.lat, lng: element.lng }}
                    ></Marker>
                  );
                })
              : null}
            <Marker
              position={{ lat: this.state.lat, lng: this.state.lng }}
            ></Marker>
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}

export default MyComponents;
