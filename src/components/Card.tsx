import { useEffect, useState } from 'react'
import header from '../images/bg-pattern-card.svg'

export function Card(props: { pokemonUrl: string; }) {

  const [data, setData] = useState<any>(undefined);

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
      <div className="card-body">
        <img
          src={data ? (data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default)  : ''}
          alt="imagen de vitoko"
          className="card-body-img"
        />
        <h1 className="card-body-title">
         {data? data.name:''}
          <span> {data?data.stats[0].base_stat:''}</span>
        </h1>
        <p className="card-body-text">{data ? data.base_experience : ''} EXP</p>
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