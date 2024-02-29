export type CreatePlayerDTO = {
  userId: string;
  deckId: string;
};

export type PlayerDTO = CreatePlayerDTO & {
  gameId: string;
};
