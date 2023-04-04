
import './App.css';

import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Card } from './components/Card';



function App() {


  const [randomValue, setRandomValue] = useState<any>([]);
  const numCards = 10
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon'

  const [query, setQuery] = useState('');

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  }

  const handleSearchClick = () => {
    setRandomValue([<Card pokemonUrl={`${apiUrl}/${query}`} />])
  }

  const handleKeyDown = (event:any) => {
    if (event.key === "Enter") {
      setRandomValue([<Card pokemonUrl={`${apiUrl}/${query}`} />])
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      let randomValues: any = []
      const response = await fetch(`${apiUrl}?offset=0&limit=2000`);
      const jsonData = await response.json();


      for (let i = 0; i < numCards; i++) {
        const value = Math.floor(Math.random() * (jsonData.results.length)) + 1

        randomValues.push(<Card pokemonUrl={jsonData.results[value].url} />)
      }
      setRandomValue(randomValues)
    };

    fetchData();
  }, []);

  


  return (
    <>
      <h1 className='title'>Pokedesk de Aarón</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearchClick}>Buscar</button>
      </div>
      

        <Carousel>
          {randomValue ?
            randomValue
            :
            ''
          }

        </Carousel>

    </>
  );
}

export default App;
