import "./watch.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Watch() {
  const [video, setvideo] = useState(null);
  const location = useLocation();

  return (
    <div className="watch">
      <div className="back">
        <Link to="/">
          <ArrowBackIcon className="backicon" />
          <span>Home</span>
        </Link>
      </div>
      <ReactPlayer
        width="100%"
        height="100%"
        playing={true}
        url={location.state.movie}
      />
    </div>
  );
}
