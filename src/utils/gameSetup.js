import { createDeck, shuffleDeck } from "./decks";

const initializeGame = () => {
  const deck = shuffleDeck(createDeck());

  const columns = Array.from({ length: 10 }, (_, index) => {
    const numberOfCards = index < 4 ? 6 : 5;
    const columnCards = deck.splice(0, numberOfCards);
    columnCards[columnCards.length - 1].hidden = false;
    return columnCards;
  });

  const stock = deck;

  return { columns, stock };
};

export default initializeGame;
