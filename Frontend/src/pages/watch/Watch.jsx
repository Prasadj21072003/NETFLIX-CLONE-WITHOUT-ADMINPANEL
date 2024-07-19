import "./watch.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Watch() {
  const location = useLocation();

  return (
    <div className="watch">
      <div className="back">
        <Link to="/">
          <ArrowBackIcon className="backicon" />
          <span>Home</span>
        </Link>
      </div>
      <div className="videodiv">
        <ReactPlayer
          width="100%"
          height="98%"
          playing={true}
          url={location.state.movie}
        />
      </div>
    </div>
  );
}
