
import './App.css';

import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Card } from './components/Card';
import { ReactTable } from './components/ReactTable';
import Aaron from './images/1680731380516.jpg'
import { Button } from '@mui/material';



function App() {

  const [randomValue, setRandomValue] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [carouselSelectedItem, setcarouselSelectedItem] = useState<number>(0);

  const numCards = 10
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon'



  useEffect(() => {
    pintarPokemonsAleatoriamente();
  }, []);

  useEffect(() => {
    setcarouselSelectedItem(0)
  }, [randomValue]);

  const filterFunction = (value: any) => {
    setRandomValue(value);
    setcarouselSelectedItem(0)

  }

  const carouselChange = (index: number) => {

    if (index === 0 && carouselSelectedItem === randomValue.length - 1) {
      pintarPokemonsAleatoriamente()

    }
    else {
      setcarouselSelectedItem(index)

    }

  }


  return (
    <>
      <div className='divMaestro'>
        <img className='maestro' src={Aaron} alt='maestro pokemon' />
      </div>
      <h1 className='title'>Pokedex de Aarón</h1>
      {search ?

        <div className='searchbox'>
          <div>
            <Button className='myButton' onClick={() => setSearch(false)}>Ocultar</Button>
          </div>
          <ReactTable data={data} filterFunction={filterFunction} allFunction={pintarPokemonsAleatoriamente} />
        </div> : <div className='searchbox'>
          <Button className='myButton' onClick={() => setSearch(true)}>Buscar</Button>
        </div>}

      <Carousel infiniteLoop={true} onChange={carouselChange} selectedItem={carouselSelectedItem} transitionTime={350}>
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
      setcarouselSelectedItem(0)
    };

    fetchData();
  }
}

export default App;
