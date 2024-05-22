import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import SortOptions from './SortOptions';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../App';

const PokemonGallery = () => {
  const { pokemonList, setPokemonList } = useContext(PokemonContext);
  const [sortType, setSortType] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
        const pokemonData = await Promise.all(response.data.results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            id: pokemonDetails.data.id,
            name: pokemonDetails.data.name,
            image: pokemonDetails.data.sprites.front_default
          };
        }));
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    if (pokemonList.length === 0) {
      fetchPokemonList();
    }
  }, [pokemonList, setPokemonList]);

  const sortPokemon = (list) => {
    return list.sort((a, b) => {
      if (sortType === 'name') {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      } else if (sortType === 'number') {
        if (sortOrder === 'asc') {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      }
      return 0;
    });
  };

  return (
    <div className="pokemon-gallery">
      <SortOptions sortType={sortType} setSortType={setSortType} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <Link to="/add">
        <button className="add-pokemon-button">Add New Pokémon</button>
      </Link>
      <div className="gallery-container">
        {sortPokemon(pokemonList).map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonGallery;
