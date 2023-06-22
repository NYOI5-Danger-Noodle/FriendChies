import React from 'react';
import './style.scss';

export default function App() {
  return (
    <div className="homepage">
      {/* do we want to give it a different name? */}
      <h1>FriendChies</h1>
      <button className='to-login-button'>
        <a class='button' href='/login'>
          Come on in!
        </a>
      </button>
    </div>
  );
}
