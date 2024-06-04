import { createContext, useReducer, useEffect } from "react";
import { Loginreducer } from "./userreducer";

const initial_state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isfetching: false,
  error: false,
};

export const Logincontext = createContext();

export const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Loginreducer, initial_state);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Logincontext.Provider
      value={{
        user: state.user,
        isfetching: state.isfetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Logincontext.Provider>
  );
};
