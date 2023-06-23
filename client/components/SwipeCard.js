import React from "react";

export default function SwipeCard(props) {
  // individual fog and changeSwipeDog function passed down as props C 
  const { dogArray, index, changeSwipeDog } = props;

  console.log("current index:", index)
  console.log("hello:", dogArray[index])

  const dogInf = dogArray[index];
  console.log("single dog:", dogInf)

  // like function
  function handleLike() {
   
    // invoke function which changes dog to next dog C
    changeSwipeDog();
  }

  // dislike function
  function handleDislike(){

    // invoke function which changes dog to next dog C
    changeSwipeDog();
  }

  return (
    <div className="card">
      <h3>{dogInf?.name}</h3>
      {/* Carousel to swipe through pictures? */}
      {/* <img className="swipeCardIm" src={link} /> */}
      <ul className="removeBullets">
        <li>
          <label className="cardLabel" id="breed">
            <strong>Breed: </strong>
            {dogInf?.breed}
          </label>
        </li>

        <li>
          <label className="cardLabel" id="age">
            <strong>Age: </strong>
            {dogInf?.age}
          </label>
        </li>

        <li>
          <label className="cardLabel" id="size">
            <strong>Size: </strong>
            {dogInf?.size}
          </label>
        </li>
        
        <li>
          <label className="cardLabel" id="breed">
            <strong>Gender: </strong>
            {dogInf?.gender}
          </label>
        </li>

        <li>
          <label className="cardLabel" id="owner">
            <strong>Owner: </strong>
            {dogInf?.owner}
          </label>
        </li>

        <li>
          <label className="cardLabel" id="zip">
            <strong>Zip: </strong>
            {dogInf?.zip}
          </label>
        </li>
      </ul>

      <button className="buttonCard" id="dislike" onClick={handleDislike}>
        No Paw
      </button>
 
      <button className="buttonCard" id="like" onClick={handleLike}>
        Paw
      </button>
    </div>
  );
}
