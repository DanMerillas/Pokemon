
import './App.css';
import ReactCardCarousel from 'react-card-carousel';
import { useEffect, useState } from 'react';
import { Card } from './components/Card';



function App() {


  const [randomValue, setRandomValue] = useState<any>([]);
  const numCards = 10

  const [query, setQuery] = useState('');

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  }

  const handleSearchClick = () => {
    setRandomValue([<Card key={1} pokemonUrl={`https://pokeapi.co/api/v2/pokemon/${query}`} />])
  }

  const handleKeyDown = (event:any) => {
    if (event.key === "Enter") {
      setRandomValue([<Card key={1} pokemonUrl={`https://pokeapi.co/api/v2/pokemon/${query}`} />])
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      let randomValues: any = []
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000`);
      const jsonData = await response.json();


      for (let i = 0; i < numCards; i++) {
        const value = Math.floor(Math.random() * (jsonData.results.length)) + 1

        randomValues.push(<Card key={value} pokemonUrl={jsonData.results[value].url} />)
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
      <div className='flex'>

        <ReactCardCarousel autoplay={false} >
          {randomValue ?
            randomValue
            :
            ''
          }

        </ReactCardCarousel>
      </div>
    </>
  );
}

export default App;
