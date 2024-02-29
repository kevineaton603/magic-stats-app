import { queryOptions, useQuery } from "@tanstack/react-query";
import { GameDTO } from "../models/Game";

export const GameQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["games", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8888/games/${id}`);
      const json = await response.json();
      return json as GameDTO;
    },
    staleTime: 1000 * 60 * 5,
  });

const useGameQuery = (id: string) => useQuery(GameQueryOptions(id));

export default useGameQuery;
