import "./App.scss";
import Home from "./pages/Home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/Login/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Logincontext } from "./context/usercontext";

const App = () => {
  const { user } = useContext(Logincontext);
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home acesstoken={user?.acesstoken} /> : <Register />}
        />

        <Route
          path="/movies"
          element={
            user ? (
              <Home type="Movie" acesstoken={user?.acesstoken} />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/series"
          element={
            user ? (
              <Home type="series" acesstoken={user?.acesstoken} />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/watch"
          element={
            user ? <Watch acesstoken={user?.acesstoken} /> : <Register />
          }
        />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
