import "./Login.scss";
import { useState, useContext } from "react";
import { loginuser } from "../../context/apicalls";
import { Logincontext } from "../../context/usercontext";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const { dispatch } = useContext(Logincontext);

  const navigate = useNavigate();

  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    loginuser(user, dispatch);

    navigate("/");
  };

  return (
    <div className="login">
      <div className="top">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158"
          alt=""
        />
      </div>

      <div className="container">
        <form className="loginform">
          <h1>Sign In</h1>

          <input
            type="email"
            className="email"
            placeholder="To Login Type:- random123@gmail.com"
            value="random123@gmail.com"
            name="email"
            onChange={handlechange}
          />
          <input
            type="password"
            className="pass"
            placeholder="To Login Type:- random123"
            value="random123"
            name="password"
            onChange={handlechange}
          />
          <button className="loginbutton" onClick={login}>
            Sign In
          </button>
          <h6>
            New to Netflix?
            <Link to="/register" className="link">
              <b> Sign up now</b>
            </Link>
          </h6>
        </form>
      </div>
    </div>
  );
}
