import PropTypes from "prop-types";
import classes from "./Container.module.css";
import Card from "../Card/Card";

export default function Container({ pokemonData }) {
  return (
    <>
      <div className={classes.containerBg}>
        <section className={classes.listResults}>
          <ul className={classes.results}>
            {pokemonData.map((pokemon) => (
              <Card
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                imageUrl={pokemon.imageUrl}
                types={pokemon.types}
              />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

Container.propTypes = {
  pokemonData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};
