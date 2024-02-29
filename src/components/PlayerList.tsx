import { useQuery } from "@tanstack/react-query";
import UserIcon from "./UserIcon";
import useGameQuery, { GameQueryOptions } from "../queries/useGameQuery";
import useUserQuery, { UserQueryOptions } from "../queries/useUserQuery";
import useDeckQuery from "../queries/useDeckQuery";
import { PlayerDTO } from "../models/Player";

const PlayerList: React.FC<{ gameId: string }> = ({ gameId }) => {
  const { data, isPending } = useQuery({
    queryKey: ["games", gameId, "players"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8888/games/${gameId}/players`,
      );
      const json = await response.json();
      return json as {
        players: PlayerDTO[];
      };
    },
  });
  const gameQuery = useGameQuery(gameId);
  if (gameQuery.isPending && isPending) {
    return <span>Loading...</span>;
  }
  if (data && gameQuery.data) {
    return (
      <div className="border border-slate-50 rounded-md p-1">
        <div className="flex flex-row justify-between">
          {new Date(gameQuery.data.playedAt).toDateString()}
          <div className="rounded-md bg-emerald-800 p-1">
            {gameQuery.data.finished ? "FINISHED" : "PLAYING"}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {data.players.map((player) => (
            <PlayerListItem
              deckId={player.deckId}
              gameId={player.gameId}
              userId={player.userId}
            />
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const PlayerListItem: React.FC<PlayerDTO> = ({ gameId, deckId, userId }) => {
  const userQuery = useUserQuery(userId);
  const deckQuery = useDeckQuery(deckId);
  const gameQuery = useGameQuery(gameId);

  if (userQuery.isPending && deckQuery.isPending && gameQuery.isPending) {
    return <span>Loading...</span>;
  }
  if (userQuery.data && deckQuery.data && gameQuery.data) {
    return (
      <div
        className={`border box-border min-h-14 p-2 flex flex-row align-baseline justify-start rounded-md dark:bg-slate-600 dark:hover:bg-slate-500 ${gameQuery.data.winners.includes(userId) ? "border-emerald-600" : "border-red-600"}`}
      >
        <div className="grid content-center">
          <UserIcon userId={userId} />
        </div>
        <div>{deckQuery.data.commander}</div>
      </div>
    );
  }
  return null;
};

export default PlayerList;
