import "./navbar.scss";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutuser } from "../../context/apicalls";
import { useContext } from "react";
import { Logincontext } from "../../context/usercontext";

const Navbar = () => {
  const { dispatch } = useContext(Logincontext);
  const logout = () => {
    logoutuser(dispatch);
  };

  const [isscrolled, setisscrolled] = useState(false);

  window.onscroll = () => {
    setisscrolled(window.pageYOffset === 0 ? false : true);
  };

  return (
    <div className={isscrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158"
            alt=""
          />

          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>

          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>

          <span>New and Popoular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <span>kid</span>
          <NotificationsIcon className="icon" />
          <AccountCircleIcon className="accounticon" />

          <div className="dropdown">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span>Settings</span>
              <Link to={"/login"} className="logoutlink">
                <span onClick={logout}>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
