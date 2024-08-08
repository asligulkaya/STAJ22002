// utils/gameSetup.js (or any other suitable location)

import { createDeck, shuffleDeck } from "./decks";

const initializeGame = () => {
  const deck = shuffleDeck(createDeck());

  const columns = Array.from({ length: 10 }, (_, index) => {
    const numberOfCards = index < 4 ? 6 : 5; // First 4 columns get 6 cards, next 6 get 5
    const columnCards = deck.splice(0, numberOfCards);
    columnCards[columnCards.length - 1].hidden = false; // Last card is face up
    return columnCards;
  });

  const stock = deck; // Remaining cards go to the stock

  return { columns, stock };
};

export default initializeGame;
