import { queryOptions, useQuery } from "@tanstack/react-query";

type Deck = {
  id: string;
  commander: string;
  owner: string;
  decklistUrl: string;
};

export const UserDecksQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["users", userId, "decks"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8888/decks/owner/${userId}`,
      );
      const json = await response.json();
      return json as { decks: Deck[] };
    },
    staleTime: 1000 * 60 * 5,
  });

const useUserDecksQuery = (userId: string) =>
  useQuery(UserDecksQueryOptions(userId));

export default useUserDecksQuery;
