import { queryOptions, useQuery } from "@tanstack/react-query";

export type Deck = {
  id: string;
  commander: string;
  owner: string;
  decklistUrl?: string;
};

export const DeckQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["decks", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8888/decks/${id}`);
      const json = await response.json();
      return json as Deck;
    },
    staleTime: 1000 * 60 * 5,
  });

const useDeckQuery = (id: string) => useQuery(DeckQueryOptions(id));

export default useDeckQuery;
