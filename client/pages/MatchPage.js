import React from 'react';
import { useEffect, useState } from 'react';
import MatchCard from '../components/MatchCard.js';

// create fetch request to get database info
// will come in as an array of  objects

export default function MatchPage() {
  const [dogs, setDogs] = useState([]);
  
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const waitDogs = await fetch('http://localhost:3000/api/matches');
        const dogs = await waitDogs.json();
        setDogs(dogs);
        console.log('Dogs array: ', dogs);
      }
      catch (err) {
        console.log('There was an error fetching data: ', err);
      }
    };
    fetchDogs();
  }, []);

  return (
    <div className="match-page">
      <h2>Match Page</h2>
      {dogs.map((doggos, index) => (
        <MatchCard
          key={index}
          name={doggos.name}
          breed={doggos.breed}
          size={doggos.size}
          age={doggos.age}
          gender={doggos.gender}
          owner={doggos.owner}
          calendarLink={doggos.calendarLink}
          // should zip be passed as props to reflect below dummy data? C
        />
      ))}
    </div>
  );
}


 // const dummyArray = [
  //   {
  //     name: 'Lula',
  //     owner: 'Laura',
  //     zip: '10024',
  //     breed: 'Labrador Retriever',
  //     size: 'Medium',
  //     gender: 'Female',
  //     age: '5',
  //     calendarLink: 'https://calendar.google.com',
  //   },
  //   {
  //     name: 'Bingo',
  //     owner: 'Kelsey',
  //     zip: '10538',
  //     breed: 'Brittany Spaniel',
  //     size: 'Medium',
  //     gender: 'Male',
  //     age: '7',
  //     calendarLink: 'https://calendar.google.com',
  //   },
  //   {
  //     name: 'Blue',
  //     owner: 'Sylvia',
  //     zip: '10005',
  //     breed: 'Pitbull Mix',
  //     size: 'Large',
  //     gender: 'Male',
  //     age: '6',
  //     calendarLink: 'https://calendar.google.com',
  //   },
  //   {
  //     name: 'Quinn',
  //     owner: 'Hallory',
  //     zip: '91602',
  //     breed: 'Terrier Mix',
  //     size: 'Small',
  //     gender: 'Female',
  //     age: '5',
  //     calendarLink: 'https://calendar.google.com',
  //   },
  //   {
  //     name: 'Wally',
  //     owner: 'Tianna',
  //     zip: '98105',
  //     breed: 'Golden Retriever',
  //     size: 'Large',
  //     gender: 'Male',
  //     age: '1',
  //     calendarLink: 'https://calendar.google.com',
  //   },
  // ];