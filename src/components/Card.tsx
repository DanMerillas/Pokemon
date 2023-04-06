import { useEffect, useState } from 'react'
import header from '../images/bg-pattern-card.svg'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { borrarDato, guardarDatos } from '../services/db';

export function Card(props: { pokemonUrl: string; favoritos: any, leerFavoritos:any}) {

  const [data, setData] = useState<any>(undefined);
  const [emptyFavorite, setEmptyFavorite] = useState<boolean>(props.favoritos.filter((x:any) => x.URL === props.pokemonUrl).length === 0);

  const guardarFavorito = () => {
    guardarDatos("FavoritosPokemon", [{ URL: props.pokemonUrl }]).then(()=>{
      props.leerFavoritos()
      setEmptyFavorite(false)
    })
  }

  const borrarFavorito = ()=>{
    borrarDato("FavoritosPokemon", props.pokemonUrl).then(()=>{
      props.leerFavoritos()
      setEmptyFavorite(true)
    })
  }

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetch(`${props.pokemonUrl}`);
      const jsonData = await response.json();

      setData(jsonData);
    };

    fetchData();
  }, [props.pokemonUrl]);

  return <div>
    <article className="card">
      <img
        src={header}
        alt="imagen header card"
        className="card-header"
      />
      {emptyFavorite ? <StarBorderIcon className='favoritos' onClick={guardarFavorito} /> : <StarIcon className='favoritos' onClick={borrarFavorito} />}
      <div className="card-body">
        <img
          src={data ? (data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default) : ''}
          alt="imagen de vitoko"
          className="card-body-img"
        />
        <h1 className="card-body-title">
          {data ? data.name : ''}
          <span> {data ? data.stats[0].base_stat : ''}</span>
        </h1>
        <p className="card-body-text">{data ? data.base_experience : ''} EXP ({data ? data.types[0].type.name : ''})</p>
      </div>
      <div className="card-footer">
        <div className="card-footer-social">
          <h3>{data ? data.stats[1].base_stat : ''}K</h3>
          <p>Ataque</p>
        </div>
        <div className="card-footer-social">
          <h3>{data ? data.stats[3].base_stat : ''}K</h3>
          <p>Ataque Especial</p>
        </div>
        <div className="card-footer-social">
          <h3>{data ? data.stats[2].base_stat : ''}K</h3>
          <p>Defensa</p>
        </div>
      </div>
    </article>
  </div>
}