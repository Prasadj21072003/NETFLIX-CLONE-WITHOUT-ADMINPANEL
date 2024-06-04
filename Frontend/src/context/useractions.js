export const registersuccess = () => ({
  type: "register_SUCCESS",
});
export const registerfailure = () => ({
  type: "register_FAILURE",
});

export const loginstart = () => ({
  type: "user_START",
});
export const loginsuccess = (user) => ({
  type: "user_SUCCESS",
  payload: user,
});
export const loginfailure = () => ({
  type: "user_FAILURE",
});

export const logoutsuccess = () => ({
  type: "logout_SUCCESS",
});
export const logoutfailure = () => ({
  type: "logout_FAILURE",
});
export const tokennotvalid = () => ({
  type: "Token_notvalid",
});
