import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { PokemonContext } from '../App';

const AddPokemonForm = () => {
  const { addPokemon } = useContext(PokemonContext);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [image, setImage] = useState('');
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && number && image && types.length && moves.length) {
      const newPokemon = {
        id: parseInt(number),
        name,
        image,
        types: types.map(type => ({ type: { name: type.value } })),
        moves: moves.map(move => ({ move: { name: move.value } }))
      };
      addPokemon(newPokemon);
      navigate('/');
    } else {
      alert('Please fill in all fields');
    }
  };

  const typeOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'fire', label: 'Fire' },
    // Agrega más tipos según sea necesario
  ];

  const moveOptions = [
    { value: 'tackle', label: 'Tackle' },
    { value: 'scratch', label: 'Scratch' },
    // Agrega más movimientos según sea necesario
  ];

  return (
    <form onSubmit={handleSubmit} className="add-pokemon-form">
      <div>
        <label>Pokémon Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Pokémon Number:</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Pokémon Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Pokémon Types:</label>
        <Select
          options={typeOptions}
          isMulti
          value={types}
          onChange={setTypes}
          required
        />
      </div>
      <div>
        <label>Pokémon Moves:</label>
        <Select
          options={moveOptions}
          isMulti
          value={moves}
          onChange={setMoves}
          required
        />
      </div>
      <button type="submit">Add Pokémon</button>
    </form>
  );
};

export default AddPokemonForm;
