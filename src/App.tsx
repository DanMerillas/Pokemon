
import './App.css';

import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Card } from './components/Card';
import { ReactTable } from './components/ReactTable';



function App() {

  const [randomValue, setRandomValue] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const numCards = 10
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon'



  useEffect(() => {
    pintarPokemonsAleatoriamente();
  }, []);




  return (
    <>
      <h1 className='title'>Pokedesk de Aarón</h1>
      <div className='searchbox'>
        <ReactTable data={data} filterFunction={setRandomValue} allFunction={pintarPokemonsAleatoriamente}/>
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

  function pintarPokemonsAleatoriamente() {
    const fetchData = async () => {

      let randomValues: any = [];
      const response = await fetch(`${apiUrl}?offset=0&limit=2000`);
      const jsonData = await response.json();


      for (let i = 0; i < numCards; i++) {
        const value = Math.floor(Math.random() * (jsonData.results.length)) + 1;

        randomValues.push(<Card pokemonUrl={jsonData.results[value].url} />);
      }
      setRandomValue(randomValues);
      setData(jsonData.results);
    };

    fetchData();
  }
}

export default App;
