import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";

export default function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              imageUrl: details.sprites.front_default,
              types: details.types.map((typeInfo) => typeInfo.type.name),
            };
          })
        );
        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, []);

  return (
    <>{loading ? <p>Loading...</p> : <Container pokemonData={pokemonData} />}</>
  );
}
