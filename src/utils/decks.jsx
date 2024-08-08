const suits = ["clubs", "diamonds", "hearts", "spades"];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const createDeck = () => {
  const deck = [];
  for (let i = 0; i < 2; i++) {
    for (const suit of suits) {
      for (const value of values) {
        deck.push({
          suit,
          value,
          hidden: true,
          image: `/icons/${suit}/${value}.png`,
        });
      }
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export { createDeck, shuffleDeck };
