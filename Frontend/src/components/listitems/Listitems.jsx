import "./listitems.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { tokennotvalid } from "../../context/useractions";

export default function Listitems(item) {
  const movieid = item.item;
  //  console.log(movieid);
  const [Movie, setMovie] = useState({});
  const [Movieimg, setMovieimg] = useState(null);
  const [Movietrailer, setMovietrailer] = useState("");

  const [ishover, setishover] = useState(false);

  useEffect(() => {
    const getlistitem = async () => {
      try {
        const res = await axios.get(`/Movie/${movieid}`, {
          headers: {
            token:
              "bearer " + JSON.parse(localStorage.getItem("user")).acesstoken,
          },
        });

        if (res.data === "Token is not valid") {
          tokennotvalid();
        } else {
          setMovie(res?.data);

          setMovieimg(res?.data.imgsmall);
          setMovietrailer(res?.data.trailer);
        }
      } catch (error) {
        console.log(`the error is: ${error}`);
      }
    };
    getlistitem();
  }, [item]);

  // console.log(Movietrailer);
  //  <video src={Movietrailer} autoPlay={true} loop />

  return (
    <Link to="/watch" state={{ movie: Movietrailer }}>
      <div
        className="listitems"
        onMouseEnter={() => {
          setishover(true);
        }}
        onMouseLeave={() => {
          setishover(false);
        }}
      >
        <LazyLoadImage src={Movieimg} alt="" className="image" />
        {ishover && (
          <div>
            <ReactPlayer
              url={Movietrailer}
              width="325px"
              height="140px"
              playing={true}
              className="Reactplayer"
            />
            <div className="icons">
              <PlayArrowIcon className="icon" />
              <AddIcon className="icon" />
              <ThumbUpOutlinedIcon className="icon" />
              <ThumbDownOffAltOutlinedIcon className="icon" />
            </div>
            <span className="title">{Movie.title}</span>
            <div className="info">
              <span>1 hour 12 min</span>
              <span className="limit"> 16+</span>
              <span>{Movie.year}</span>
            </div>
            <div className="desc">
              <span> {Movie.desc} </span>
            </div>
            <div className="genre">{Movie.genre}</div>
          </div>
        )}
      </div>
    </Link>
  );
}
