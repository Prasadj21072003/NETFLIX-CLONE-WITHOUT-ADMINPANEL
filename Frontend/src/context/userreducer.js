export const Loginreducer = (state, action) => {
  switch (action.type) {
    case "user_START":
      return {
        user: null,
        isfetching: true,
        error: false,
      };
    case "user_SUCCESS":
      return {
        user: action.payload,
        isfetching: false,
        error: false,
      };
    case "user_FAILURE":
      return {
        user: null,
        isfetching: false,
        error: true,
      };
    case "register_SUCCESS":
      return {
        user: null,
        isfetching: false,
        error: false,
      };
    case "register_FAILURE":
      return {
        user: null,
        isfetching: false,
        error: true,
      };

    case "logout_SUCCESS":
      return {
        user: null,
        isfetching: false,
        error: false,
      };
    case "logout_FAILURE":
      return {
        user: state.user,
        isfetching: false,
        error: true,
      };
    case "Token_notvalid":
      return {
        user: null,
        isfetching: false,
        error: true,
      };
  }
};
