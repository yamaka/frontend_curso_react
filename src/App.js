import logo from "./logo.svg";
import "./App.css";

import Header from "./Header";
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Cursos from "./pages/Cursos/Cursos";
import Curso from "./pages/Curso/Curso";

import { Signin } from "./pages/Auth/Signin";
import { Signup } from "./pages/Auth/Signup";

//context
import CarritoProvider from "./context/CarritoContext";
import AuthProvider from "./context/AuthContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counterCart: 0,
    };
  }

  addToCart = () => {
    const { counterCart } = this.state;
    this.setState({
      counterCart: counterCart + 1,
    });
  };

  render() {
    const { counterCart } = this.state;
    return (
      <AuthProvider>
        <CarritoProvider>
          <Router>
            <div className="App">
              <Header />
              <div>
                <Switch>
                  {/* routes for login */}
                  <Route exact path="/signin">
                    <Signin />
                  </Route>
                  <Route exact path="/signup">
                    <Signup />
                  </Route>

                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/cursos">
                    <Cursos addToCart={this.addToCart} />
                  </Route>
                  <Route exact path="/cursos/:idCurso">
                    <Curso />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
        </CarritoProvider>
      </AuthProvider>
    );
  }
}

export default App;
