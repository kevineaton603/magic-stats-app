import { createRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import RootRoute from "../RootRoute";
import PlayerList from "../../components/PlayerList";
import { GameDTO } from "../../models/Game";

const Component: React.FC = () => {
  const { data, isPending } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8888/games/?limit=10&offset=0",
        {},
      );
      const json = await response.json();
      return json as {
        games: GameDTO[];
      };
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }
  if (data) {
    return (
      <div className="text-slate-50 p-3">
        <h2 className="text-lg">Latest Games:</h2>
        <div className="flex flex-col gap-2 mb-3">
          {data.games?.map((game) => <PlayerList gameId={game.id} />)}
        </div>
      </div>
    );
  }
  return null;
};

const LandingRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: Component,
});

export default LandingRoute;
