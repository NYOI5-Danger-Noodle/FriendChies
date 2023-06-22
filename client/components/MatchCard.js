import React from 'react';
import { useState, useEffect } from 'react';

export default function MatchCard(props) {
  // make an array of dummy data objects
  // loop through the array of objects and get data from each individual object
  const { name, breed, size, age, gender, owner, calendarLink, zip } = props;

  // send calendar invite function - assign to the click property of the functions
  function sendInvite() {
    window.open(calendarLink)
    // alert('Calendar Invite Sent!');
  }
  // remove match function - assign to the click property of the functions
  function removeMatch() {
    // remove that card from the page - still need to add functionality
    // send a delete request to backend
    alert('Removed from Matches!');
  }
  return (
    <div className="card">
      <img />
      <h3>{name}</h3>
      <ul class='removeBullets'>
        <li>
          <label class='breed'>
            <strong>Breed: </strong> {breed}
          </label>
        </li>

        <li>
          <label class='age'>
            <strong>Age: </strong>
            {age}
          </label>
        </li>

        <li>
          <label class='size'>
            <strong>Size: </strong>
            {size}
          </label>
        </li>

        <li>
          <label class='gender'>
            <strong>Gender: </strong>
            {gender}
          </label>
        </li>

        <li>
          <label class='zip'>
            <strong>Zip: </strong>
            {zip}
          </label>
        </li>

        <li>
          <label class='owner'>
            <strong>Owner: </strong>
            {owner}
          </label>
        </li>
      </ul>

      {/* Send Calendar Invite */}
      <button class='buttonCard' id='sendInvite' onClick={sendInvite}>
        Send Calendar Invite
      </button>
      {/* Remove Match */}
      <button class='buttonCard' id='removeMatch' onClick={removeMatch}>
        Remove from Matches
      </button>
    </div>
  );
}
