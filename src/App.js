import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonGallery from './components/PokemonGallery';
import PokemonDetails from './components/PokemonDetails';
import AddPokemonForm from './components/AddPokemonForm';

export const PokemonContext = createContext();

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const addPokemon = (newPokemon) => {
    setPokemonList([...pokemonList, newPokemon]);
  };

  return (
    <PokemonContext.Provider value={{ pokemonList, setPokemonList, addPokemon }}>
      <Router>
        <Routes>
          <Route path="/" element={<PokemonGallery />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="/add" element={<AddPokemonForm />} />
        </Routes>
      </Router>
    </PokemonContext.Provider>
  );
};

export default App;
