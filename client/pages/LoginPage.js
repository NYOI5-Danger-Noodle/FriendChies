import React, { useState } from 'react';
import axois from 'axios';

export default function LoginPage() {
  const [loginUserVal, setLoginUserVal] = useState('');
  const [loginPassVal, setLoginPassVal] = useState('');

  async function login() {
    console.log('loginUserVal:', loginUserVal);
    // '/api/user/login' functionality not yet written
    const response = await axois.get('/api/user/login', {
      username: loginUserVal,
      password: loginPassVal,
    });
    console.log('login:', response);
  }

  return (
    <div className="login-page">
      <h1>Log In </h1>
        <button className='git-login-button'>
          <a class='button' href='/api/auth'>
            Sign In With GitHub
          </a>
        </button>
      <label>Username</label>
      <input
        id='username'
        value={loginUserVal}
        onChange={(e) => setLoginUserVal(e.target.value)}
      />
      <label>Password</label>
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
