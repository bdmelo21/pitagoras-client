import React from "react";
import Pitagoras from "../assets/PITAGORAS.svg";
import ClipLoader from "react-spinners/ClipLoader";

function LoadingFunctionComponent() {
  return (
    <div className="loading-black-pitagoras">
      <div>
        <Pitagoras></Pitagoras>
      </div>
      <div>
        <ClipLoader size={100} color={"#009356"} />
      </div>
    </div>
  );
}
export default LoadingFunctionComponent;
