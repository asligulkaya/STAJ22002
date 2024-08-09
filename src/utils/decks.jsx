export const createDeck = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];

  let deck = [];
  for (let i = 0; i < 2; i++) {
    suits.forEach((suit) => {
      values.forEach((value) => {
        deck.push({ suit, value, hidden: true });
      });
    });
  }
  return deck;
};

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
