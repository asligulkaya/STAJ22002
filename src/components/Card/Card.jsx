import PropTypes from "prop-types";
import classes from "./Card.module.css";

export default function Card({
  name = "Unknown",
  id = 0,
  imageUrl = "https://placehold.co/215",
  types = [],
}) {
  return (
    <>
      <li className={classes.card}>
        <a className={classes.pokemon} href="#">
          <img src={imageUrl} alt={name} className={classes.pokemonImg} />
        </a>
        <div>
          <p className={classes.pokemonId}>#{id}</p>
          <div className={classes.pokemonName}>{name}</div>
          <div className={classes.tags}>
            {types.map((type, index) => (
              <div key={index} className={classes.tag}>
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </li>
    </>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};
