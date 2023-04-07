
import './App.css';

import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Card } from './components/Card';
import { ReactTable } from './components/ReactTable';
import { Button } from '@mui/material';
import { obtenerDatos } from './services/db';



function App() {

  const [randomValue, setRandomValue] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [carouselSelectedItem, setcarouselSelectedItem] = useState<number>(0);
  const [favoritos, setFavoritos] = useState<any>([]);
  const [verFavoritos, setVerFavoritos] = useState<boolean>(false);
  const [maestro, setMaestro] = useState<string>("");

  const numCards = 10
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon'



  useEffect(() => {
    obtenerDatos("PokemonSettings", "FOTO", "id").then((results:any) => {
      setMaestro(results.data && results.data.length > 0 ? results.data[0].FOTO: '')
      leerFavoritos(pintarPokemonsAleatoriamente)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setcarouselSelectedItem(0)
  }, [randomValue]);

  const filterFunction = (value: any) => {
    setRandomValue(value);
    setcarouselSelectedItem(0)

  }

  const leerFavoritos = (callback?: any) => {
    obtenerDatos("FavoritosPokemon", "URL", "URL").then((results) => {
      setFavoritos(results.data)
      if (callback)
        callback()
    })
  }
  const carouselChange = (index: number) => {

    if (!verFavoritos && index === 0 && carouselSelectedItem === randomValue.length - 1) {
      pintarPokemonsAleatoriamente()
    }
    else {
      setcarouselSelectedItem(index)
    }

  }

  const pintarFavoritos = () => {
    setVerFavoritos(true)
    let randomValues = []
    for (let i = 0; i < favoritos.length; i++) {
      randomValues.push(<Card key={favoritos[i].URL} pokemonUrl={favoritos[i].URL} leerFavoritos={leerFavoritos} favoritos={favoritos} />);
    }
    setRandomValue(randomValues);
    setcarouselSelectedItem(0)
  }

  return (
    <>
      <div className='divMaestro'>
        <img className='maestro' src={maestro} alt='maestro pokemon' />
      </div>
      <h1 className='title'>Pokedex de Aarón</h1>
      {search ?

        <div className='searchbox'>
          <div>
            <Button className='myButton' onClick={() => {
              setSearch(false)
              setVerFavoritos(false)
              }
              }>Ocultar</Button>
          </div>
          <ReactTable data={data} filterFunction={filterFunction} allFunction={pintarPokemonsAleatoriamente} leerFavoritos={leerFavoritos} favoritos={favoritos} />
        </div> : <div className='searchbox'>
          <Button className='myButton' onClick={() => {
            setVerFavoritos(true)
            setSearch(true)
          }
          }>Buscar</Button><Button className='myButton' onClick={() => pintarFavoritos()}>Favoritos</Button>
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

        randomValues.push(<Card key={jsonData.results[value].url} pokemonUrl={jsonData.results[value].url} leerFavoritos={leerFavoritos} favoritos={favoritos} />);
      }
      setRandomValue(randomValues);
      setData(jsonData.results);
      setcarouselSelectedItem(0)
    };

    fetchData();
  }
}

export default App;
