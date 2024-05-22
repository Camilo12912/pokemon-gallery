import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} />
      <div className="pokemon-name">{pokemon.name}</div>
      <div className="pokemon-number">#{pokemon.id}</div>
      <Link to={`/pokemon/${pokemon.id}`} className="see-more-button">
        See More
      </Link>
    </div>
  );
};

export default PokemonCard;
