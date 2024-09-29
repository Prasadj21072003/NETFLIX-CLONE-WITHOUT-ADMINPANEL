import "./register.scss";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registeruser } from "../../context/apicalls";
import { Logincontext } from "../../context/usercontext";

export default function Register() {
  const navigate = useNavigate();

  const { dispatch } = useContext(Logincontext);
  const [email, setemail] = useState("");

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const refemail = useRef();
  const refpass = useRef();
  const refusername = useRef();

  const emailclick = () => {
    setemail(refemail.current.value);
  };

  const passclick = async (e) => {
    e.preventDefault();
    setusername(refusername.current.value);
    setpassword(refpass.current.value);
    console.log(username);
    console.log(email);
    console.log(password);
    var user = {
      username: username,
      email: email,
      password: password,
    };

    await registeruser(user, dispatch);

    navigate("/login");
  };

  const signin = () => {
    try {
      navigate("/login");
    } catch (e) {
      console.log(`the error is ${e}`);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158"
          alt=""
        />

        <button className="loginbutton" type="button" onClick={signin}>
          sign in
        </button>
      </div>

      <div className="container">
        <h1>Unlimited movies,Tv shows, and more</h1>
        <h2>Watch anywhere. Cancel anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="emailaddress" ref={refemail} />
            <button className="registerbutton" onClick={emailclick}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username"
              ref={refusername}
              name="username"
              //onChange={userinfo}
            />
            <input
              type="password"
              placeholder="Password"
              ref={refpass}
              name="password"
              //   onChange={userinfo}
            />
            <button className="registerbutton" onClick={passclick}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
