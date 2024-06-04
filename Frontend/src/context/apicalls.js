import axios from "axios";
import {
  loginstart,
  loginsuccess,
  loginfailure,
  registersuccess,
  registerfailure,
  logoutsuccess,
  logoutfailure,
} from "./useractions";
import { Navigate } from "react-router-dom";

export const registeruser = async (user, dispatch) => {
  try {
    const resp = await axios.post(
      "/api/auth/register",
      user,

      {
        headers: {
          token:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTU5MWE4ODJkYzRhMGZmYmZjYmY3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODczNTYxMiwiZXhwIjoxNjg5MTY3NjEyfQ.1AMIco4WdDAzNlYG3lfzpHKLLoPj_kE2zzYRCPGCoPA",
        },
      }
    );

    console.log(resp);

    dispatch(registersuccess());
    <Navigate to="/login" />;
  } catch (error) {
    dispatch(registerfailure());
    console.log(error);
  }
};

export const loginuser = async (user, dispatch) => {
  try {
    const resp = await axios.post(
      "/api/auth/login",
      user,

      {
        headers: {
          token:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTU5MWE4ODJkYzRhMGZmYmZjYmY3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODczNTYxMiwiZXhwIjoxNjg5MTY3NjEyfQ.1AMIco4WdDAzNlYG3lfzpHKLLoPj_kE2zzYRCPGCoPA",
        },
      }
    );
    // console.log(resp);
    dispatch(loginsuccess(resp.data));
  } catch (error) {
    dispatch(loginfailure());
    console.log(error);
  }
};

export const logoutuser = async (dispatch) => {
  try {
    dispatch(logoutsuccess());
  } catch (error) {
    dispatch(logoutfailure());
    console.log(error);
  }
};
