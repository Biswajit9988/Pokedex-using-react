import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import "./PokemonList.css";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon_URL, setPokemon_URL] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prev_URL, setPrev_URL] = useState("");
  const [next_URL, setNext_URL] = useState("");

  async function Downloaded() {
    const response = await axios.get(pokemon_URL);
    setPrev_URL(response.data.previous);
    setNext_URL(response.data.next);

    const pokemonResults = response.data.results;
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromise);

    const req = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;

      return {
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
        height: pokemon.height,
        id: pokemon.id,
      };
    });

    setPokemonList(req);
    setIsLoading(false);
  }

  useEffect(() => {
    Downloaded();
  }, [pokemon_URL]);

  function prevList() {
    setPokemon_URL(prev_URL);
  }

  function nextList() {
    setPokemon_URL(next_URL);
  }

  return (
    <div className="pokemon-list-outer">
      <div className="Pokemon-list-wrapper">
        {isLoading
          ? "Loading..."
          : pokemonList.map((p) => (
              <Pokemon
                key={p.id}
                name={p.name}
                image={p.image}
                alt={p.name}
                height={p.height}
              />
            ))}
      </div>
      <div className="btn">
        <button disabled={prev_URL == null} onClick={prevList}>
          Prev
        </button>
        <button disabled={next_URL == null} onClick={nextList}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
