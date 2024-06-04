import "./Featured.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { collapseClasses } from "@mui/material";
import { tokennotvalid } from "../../context/useractions";

export default function Featured(props) {
  const [Movie, setMovie] = useState([]);
  const [Movieimg, setMovieimg] = useState("");

  const [genre, setgenre] = useState(null);

  useEffect(() => {
    props.genreis(genre);
    // console.log(genre);
  }, [genre]);

  const selectgenre = (e) => {
    setgenre(e.target.value);
  };

  useEffect(() => {
    const getfeaturedmovie = async () => {
      try {
        const res = await axios.get(
          `/Movie/${props.type ? "?type=" + props.type : ""}`,
          {
            headers: {
              token:
                "bearer " + JSON.parse(localStorage.getItem("user")).acesstoken,
            },
          }
        );
        // console.log(res.data);
        if (res.data === "Token is not valid") {
          tokennotvalid();
        } else {
          setMovie(res?.data[0]);
        }
        //  setMovieimg(res.data[0].img);
      } catch (error) {
        console.log(`the error is: ${error}`);
      }
    };
    getfeaturedmovie();
  }, [props.type]);

  return (
    <div className="Featured">
      {props.type && (
        <div className="category">
          <span>{props.type === "Movie" ? "Movies" : "Series"}</span>

          <select name="genre" id="genre" onChange={selectgenre}>
            <option className="option" value="Genre">
              Genre
            </option>
            <option className="option" value="Action">
              Action
            </option>
            <option className="option" value="Comedy">
              Comedy
            </option>
            <option className="option" value="Crime">
              Crime
            </option>
            <option className="option" value="Fantasy">
              Fantasy
            </option>
            <option className="option" value="Historical">
              Historical
            </option>
            <option className="option" value="Horror">
              Horror
            </option>
            <option className="option" value="Romance">
              Romance
            </option>
            <option className="option" value="Thriller">
              Thriller
            </option>
            <option className="option" value="Western">
              Western
            </option>
            <option className="option" value="Sci-fi">
              SCi-fi
            </option>
            <option className="option" value="Animation">
              Animation
            </option>
            <option className="option" value="Drama">
              Drama
            </option>
            <option className="option" value="Documentry">
              Documentry
            </option>
          </select>
        </div>
      )}
      <img src={Movie?.img} alt="" />;
      <div className="info">
        <div className="photodiv">
          <img src={Movie?.imgtitle} alt="" />
        </div>
        <span className="description">{Movie?.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
