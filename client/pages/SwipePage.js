import React from "react";
import { useState, useEffect } from "react";
import SwipeCard from "../components/SwipeCard.js";

export default function SwipePage() {
  const [swipeDogs, setSwipeDogs] = useState([]);
  const [i, setI] = useState(0);

  // might need logic for if array is empty? 
  // currently is rendering with an empty array? 
  // look into loading state 

  // move through the array of dogs C
  const changeSwipeDog = () => {
    setI(i + 1)
  }

  useEffect(() => {
    fetchSwipeDogs()}, []);

  async function fetchSwipeDogs () {
    try {
      const waitSwipeDogs = await fetch('http://localhost:8080/api/dogs'); // when it was 3000 wasn't working C 
      const usableSwipeDogs = await waitSwipeDogs.json(); 
      console.log('Swipe dogs array:', usableSwipeDogs);
      setSwipeDogs(usableSwipeDogs);
    }
    catch (err) {
      console.log('There was an error fetching data:', err)
    }
  };

  // you can't check state within the function you set it because it's asynchronous 
  console.log("state dogs:", swipeDogs);

  if (i >= swipeDogs.length && i > 0) {
    return (
      <div>
        <h3>Sorry, there's no more dawgs</h3>
      </div>
    )
  }

  else {
  return (
    <div className="swipe-page">
      <h3>Swipe Page</h3>
      {/* prop drill an individual dog, and method to change the index C */}
      <SwipeCard dogArray={swipeDogs} index={i} changeSwipeDog={changeSwipeDog} />
    </div>
  );
}
}

