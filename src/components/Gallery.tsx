// src/components/Gallery.tsx

import React, { useEffect, useState } from 'react';

const Gallery: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();
      setPokemonData(data.results);
    };

    fetchPokemon();
  }, []);

  return (
    <div className="gallery">
      <h2 className="animated">Pokémon Gallery</h2>
      <div className="pokemon-list">
        {pokemonData.map((pokemon, index) => (
          <div key={index} className="pokemon-card animated">
            <h3>{pokemon.name}</h3>
            <img
              src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
              alt={pokemon.name}
            />
            <button>Catch {pokemon.name}!</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
