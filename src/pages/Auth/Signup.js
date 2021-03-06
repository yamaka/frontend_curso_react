
import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import GoogleLogin from "react-google-login";
import createHash from "hash-generator"

import "./Login.css"


const WEB_ROOT = "http://localhost:8080/api/auth/signup";
export const Signup = () => {
    const history = useHistory();
    const [signupForm, setSignupForm] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword: ''
    })
    const [succedRegister, setSuccedRegister] = useState(false);
    const [fromGoogle, setFromGoogle] = useState(false);

    //const {username, email, password, confirmPassword} = signupForm;

    useEffect(()=>{
        verifyConfirmPassword()
    },[signupForm.confirmPassword])


    useEffect(()=>{
      if(fromGoogle){
        register();
      }
    },[fromGoogle])

    const updateSignupFormProperty = (key, value) =>{
        console.log(key,value)
        const newValue = {
            [key]: value
        }
        setSignupForm({...signupForm, ...newValue});
    }

    const register = async () =>{
        const { username, email, password } = signupForm;
        const params ={
            username,
            email,
            password,
        }
        if (!isEmptyPasswords() && verifyConfirmPassword()) {
            const response = await axios.post(WEB_ROOT, params);
            if (response) {
              const { data } = response;
              console.log("register!!!! data>>> ", data);
              setSuccedRegister(true)
              setTimeout(()=>{
                history.push("/signin")
              },2000)
              //TODO trabjar el logueo en la interdaz "header"
            }
        }

    }

    const isEmptyPasswords=()=>{
        const{password, confirmPassword} = signupForm;
        return password == '' && confirmPassword== '';
    }
    const verifyConfirmPassword=()=>{
        const{password, confirmPassword} = signupForm;
        if ( password === confirmPassword) {
          return true;
        }
        return false
    }
    if(succedRegister){
        return (<div className="flex flex-row justify-center items-center">
            <h2 className="text-green-400 font-bold text-4xl">Registro exitoso!</h2>
        </div>)
    }

    const handleSubmit = ()=>{
      setFromGoogle(false);
      register();
    } 

    const responseGoogle = (response) =>{
      console.log("login google",response);
      const username = response.profileObj.name;
      const email = response.profileObj.email;
      const hashLength = 8;
      const password = createHash(8);
      const  confirmPassword = password;
      setSignupForm({
        ...signupForm,
        ...{ username, email, password, confirmPassword },
      });

      setFromGoogle(true);    
    }
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
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
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={(e) => updateSignupFormProperty("email", e.target.value)}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Constrase??a"
            value={signupForm.password}
            onChange={(e) =>
              updateSignupFormProperty("password", e.target.value)
            }
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirmar Constrase??a"
            value={signupForm.confirmPassword}
            onChange={(e) =>
              updateSignupFormProperty("confirmPassword", e.target.value)
            }
          />
          {!isEmptyPasswords() && !verifyConfirmPassword() && (
            <span className=" text-red-500">
              Las contrase??as no coinciden!!!
            </span>
          )}
          {!isEmptyPasswords() && verifyConfirmPassword() && (
            <span className=" text-green-500">Correcto</span>
          )}

          <button
            type="submit"
            className=" bg-green-500 w-full text-center py-3 rounded text-white hover:bg-green-dark focus:outline-none my-1"
            onClick={() => handleSubmit()}
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
