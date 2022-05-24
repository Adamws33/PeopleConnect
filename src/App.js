import './App.css';
import { useEffect, useState } from 'react';



function App() {
  const [selectedA, setSelectedA] = useState(['']);
  const [selectedB, setSelectedB] = useState(['']);
  const [optionsArray, setOptionsArray] = useState([]);
  const [homeworld, setHomeworld] = useState('')
  const [filmList, setFilmList] = useState([])
  const [starshipList, setStarshipList] = useState([])
  const [vehicleList, setVehicleList] = useState([])
  const [shared, setShared] = useState([]);

  const list = []

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
    .then((res) => {
      return res.json();
    })
    .then(createOptionsArray)
    .catch((err) => {
      throw(err);
    })
  }, [optionsArray]);

  const createOptionsArray = (data) => {
    setOptionsArray(data.results);
  };

  useEffect(() => {
    filmList.forEach(film => {
      fetch(film)
      .then((res) => {
        return res.json();
      })
      .then(createFilmArray)
      .catch((err) => {
        throw(err);
      })
    })
    starshipList.forEach(film => {
      fetch(film)
      .then((res) => {
        return res.json();
      })
      .then(createArray)
      .catch((err) => {
        throw(err);
      })
    })
    vehicleList.forEach(film => {
      fetch(film)
      .then((res) => {
        return res.json();
      })
      .then(createArray)
      .catch((err) => {
        throw(err);
      })
    })
    fetch(homeworld)
    .then((res) => {
      return res.json();
    })
    .then(createArray)
    .catch((err) => {
      throw(err);
    })
  }, [filmList, starshipList, vehicleList, homeworld])
  
  const createFilmArray = (data) => {
    list.push(`${selectedA.name} and ${selectedB.name} were seen together in ${data.title}`)
    setShared([...list])
  };

  const createArray = (data) => {
    list.push(`${selectedA.name} and ${selectedB.name} were seen on ${data.name}`)
    setShared([...list])
  };
 
//if we wanted the list to change each time a drop down item was selected we could place this in a useEffect
  const getInfo = () => {
    const films = [];
    const starships = [];
    const vehicles = [];
    let homeworld = ''

    if (selectedA.films.length > 0 && selectedB.films.length > 0){
      selectedA.films.forEach(filmA => {
        selectedB.films.forEach(filmB => {
          if (filmA === filmB){
            films.push(filmA);
          }
        })
      })
    };

    //check for starship matches 

    if (selectedA.homeworld === selectedB.homeworld){
      setHomeworld(selectedA.homeworld)
    };

    if (selectedA.starships.length > 0 && selectedB.starships.length > 0){
      selectedA.starships.forEach(shipA => {
        selectedB.starships.forEach(shipB => {
          if (shipA === shipB){
            starships.push(shipA)
          }
        })
      })
    };

    if (selectedA.vehicles.length > 0 && selectedB.vehicles.length > 0){
      selectedA.vehicles.forEach(vehicleA => {
        selectedB.vehicles.forEach(vehicleB => {
          if (vehicleA === vehicleB){
            vehicles.push(vehicleA)
          }
        });
      });
    };

    setHomeworld(homeworld)
    setFilmList(films);
    setStarshipList(starships);
    setVehicleList(vehicles);
  };

  const handleChange = (event) => {
    const option = [];
    
    optionsArray.forEach(opt => {
      if (opt.name === event.target.value) {
        option.push(opt);
      }
    })
    if (event.target.name === 'selectedA') {
      setSelectedA(option[0]);
    } else {
      setSelectedB(option[0]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <select 
            id='A'
            name="selectedA"
            onChange= {handleChange}
            >
            <option value={''}>{''}</option>
            {optionsArray.map(opt => {
              if (opt.name !== selectedB?.name) {
                return (
                  <option value={opt.name}>
                    {opt.name}
                  </option>
                )
              }
            })}

          </select>
          <select 
            style={{margin: '10px'}}
            id='B'
            name="selectedB"
            onChange= {handleChange}
            >
            <option value={''}>{''}</option>
            {optionsArray.map(opt => {
              if (opt.name !== selectedA?.name) {
                return (
                  <option value={opt.name}>
                    {opt.name}
                  </option>
                )
              }
            })}

          </select>
        </div>
        <button 
          color='primary'
          onClick={() => getInfo()}
          >
            Submit
          </button>
          {shared.map((item, i) => {
            return <li key={`${item}-${i}`}>{item}</li>
          })}
      </header>
    </div>
  );
}

export default App;
