import React from "react";
import "./styles.scss";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/Loginform";
import SignupForm from "./components/SingupForm";
import Sell from "./components/Sell";
import AddProduct from "./components/AddProduct";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  // console.log("Your mode is dark: ", darkMode)

  const toggleMode = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <PrivateRoute
          toggleMode={toggleMode}
          darkMode={darkMode}
          path="/dashboard"
          component={Dashboard}
        />
        <PrivateRoute exact path="/sell" component={Sell} />
        <PrivateRoute exact path="/myads" component={AddProduct} />
      </div>
    </Router>
  );
}

export default App;
