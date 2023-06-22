import React, { useState } from 'react';
import axios from 'axios';

export default function SignupPage() {
  const [userVal, setUserVal] = useState('');
  const [passVal, setPassVal] = useState('');

  async function signup() {
    console.log(userVal);
    //May be able to import app from server to use instead of axious
    const response = await axios.post('/api/user/signup', {
      username: userVal,
      password: passVal,
    });
    console.log(response);
  }

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
        <button className='git-login-button'>
          <a className='button' href='/api/auth'>
            Create Profile With GitHub
          </a>
        </button>
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        value={userVal}
        onChange={(e) => setUserVal(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        value={passVal}
        onChange={(e) => setPassVal(e.target.value)}
      />
      <button id='signup-button' onClick={signup}>
        Sign Up
      </button>
    </div>
  );
}
