import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./Login.css";
import {AuthContext} from "../../context/AuthContext";

const WEB_ROOT = "http://localhost:8080/api/auth/signin";
export const Signin = () => {
  const history = useHistory();

  const [authStateContext, setAuthStateContext] = useContext(AuthContext);
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
  });
  const [succedLogin, setSuccedLogin] = useState(false);

  //const {username, email, password, confirmPassword} = signupForm;

  

  const updateSignupFormProperty = (key, value) => {
    console.log(key, value);
    const newValue = {
      [key]: value,
    };
    setSignupForm({ ...signupForm, ...newValue });
  };

  const login = async () => {
    const { username, password } = signupForm;
    const params = {
      username,
      password,
    };
    
    const response = await axios.post(WEB_ROOT, params);
    if (response) {
    const { data } = response;
    console.log("login!!!! data>>> ", data);
    setSuccedLogin(true);
    setTimeout(() => {
        localStorage.setItem('IS_LOGGED_IN', 'true');
        const user = {
          username: data.username,
          email: data.email,
          isLoggedIn: true
        };

        localStorage.setItem("USER", JSON.stringify(user));
        setAuthStateContext({
            ...authStateContext,
            ...{
                isLoggedIn: true, 
                username: data.username,
                email: data.email
            }
        })
        history.push("/");
    }, 2000);
    //TODO trabjar el logueo en la interdaz "header"
    }
  }
  
  if (succedLogin){
    return (
      <div className="flex flex-row justify-center items-center">
        <h2 className="text-green-400 font-bold text-4xl">Login exitoso!</h2>
      </div>
    );
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Usuario"
            value={signupForm.username}
            onChange={(e) =>
              updateSignupFormProperty("username", e.target.value)
            }
          />

          
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Constraseña"
            value={signupForm.password}
            onChange={(e) =>
              updateSignupFormProperty("password", e.target.value)
            }
          />

          <button
            type="submit"
            className=" bg-green-500 w-full text-center py-3 rounded text-white hover:bg-green-dark focus:outline-none my-1"
            onClick={() => login()}
          >
            Registro
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};
