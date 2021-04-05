import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

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
  const [fromGoogle, setFromGoogle] = useState(false);

  //const {username, email, password, confirmPassword} = signupForm;

  useEffect(() => {
    if (fromGoogle) {
      login();
    }
  }, [fromGoogle]);

  const updateSignupFormProperty = (key, value) => {
    console.log(key, value);
    const newValue = {
      [key]: value,
    };
    setSignupForm({ ...signupForm, ...newValue });
  };

  const login = async () => {
    debugger;
    const { username, password } = signupForm;
    const params = {
      username,
      password,
      fromGoogle
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
          isLoggedIn: true,
          id: (data.id).toString()
        };

        localStorage.setItem("USER", JSON.stringify(user));
        setAuthStateContext({
          ...authStateContext,
          ...{
            isLoggedIn: true,
            username: data.username,
            email: data.email,
            id: data.id.toString(),
          },
        });
        history.push("/");
    }, 2000);
    //TODO trabjar el logueo en la interdaz "header"
    }
  }

  const responseGoogle = (response) => {
    console.log("login google", response);
    const username = response.profileObj.name;
  
    setSignupForm({
      ...signupForm,
      ...{ username },
    });

    setFromGoogle(true);
  };
  
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

        <div className=" flex flex-col items-center text-grey-dark mt-6">
          <div>Hazlo con google o facebook</div>
          <GoogleLogin
            clientId="585612183624-ro55sv0ggkclm8a31tvqlfsfe21j19au.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
};
