import React, { useState } from 'react';
import axois from 'axios';
import { redirect } from 'react-router-dom';

export default function LoginPage() {
    const [loginUserVal, setLoginUserVal] = useState("");
    const [loginPassVal, setLoginPassVal] = useState("");

    const rejected = '/login'
    const accepted = 'swipe'
    let result;

    function login() {
        console.log("loginPage vals: ", loginUserVal,loginPassVal )
        // '/api/user/login' functionality not yet written 
        fetch('/api/user/login',{
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body : JSON.stringify({username: loginUserVal, password: loginPassVal}) ,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => result=data)
        // console.log(allowed)
       
            
        // const response = await axois.post('/api/user/login', {
        //     username: loginUserVal,
        //     password: loginPassVal
        // })
        //gotta figure out how to get res.locals here
        //will use the login boolean to determine redirection or not
        // console.log("What is sent back to loginPage: ", response)
    };
    
    return (
    <div className="login-page">
      <h1>Log In </h1>
        <button className='git-login-button'>
          <a class='button' href='/api/auth'>
            Sign In With GitHub
          </a>
        </button>
      <label className="user-fields">Username:</label>
      <input
        id='username'
        value={loginUserVal}
        onChange={(e) => setLoginUserVal(e.target.value)}
      />
      <label className="user-fields">Password:</label>
      <input
        value={loginPassVal}
        onChange={(e) => setLoginPassVal(e.target.value)}
      />
      <button id='login-button' onClick={login}>
        Log In
      </button>
    </div>
  );
}