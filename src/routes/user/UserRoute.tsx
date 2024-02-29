import { Link, createRoute } from "@tanstack/react-router";
import RootRoute from "../RootRoute";
import useUserQuery from "../../queries/useUserQuery";
import UserIcon from "../../components/UserIcon";
import useUserDecksQuery, {
  UserDecksQueryOptions,
} from "../../queries/useUserDecksQuery";
import LandingRoute from "../landing/LandingRoute";
import DeckForm from "../../components/DeckForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Component: React.FC = () => {
  const queryClient = useQueryClient();
  const { userId } = UserRoute.useParams();
  const { data, isPending } = useUserQuery(userId);
  const { mutate } = useMutation({
    mutationFn: async (model: {
      commander: string;
      decklistUrl?: string;
      owner: string;
    }) =>
      fetch(`http://localhost:8888/decks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      }),
    onSuccess: () => {
      const { queryKey } = UserDecksQueryOptions(userId);
      queryClient.refetchQueries({
        queryKey: queryKey,
        exact: true,
      });
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }
  if (data) {
    return (
      <div className="dark:bg-slate-600 text-slate-50 p-3 box-border rounded-md backdrop-blur-none">
        <Link to={LandingRoute.to} className="text-sm font-bold">
          {"< Back"}
        </Link>
        <div className="flex flex-row gap-4 items-center">
          <UserIcon userId={userId} />
          <h2 className="text-lg">{data.name}</h2>
        </div>
        <h3 className="text-lg">Decks: </h3>
        <UserDecks userId={userId} />
        <h3 className="text-lg">New Deck</h3>
        <DeckForm
          model={{ commander: "", id: "", owner: userId }}
          onSubmit={mutate}
        />
      </div>
    );
  }
  return null;
};

const UserDecks: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isPending } = useUserDecksQuery(userId);
  if (isPending) {
    return <span>Loading...</span>;
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      {data?.decks.map((deck) => (
        <div className="dark:bg-slate-500 rounded-md p-2 hover:dark:bg-slate-400">
          {deck.commander}
        </div>
      ))}
    </div>
  );
};

const UserRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "users/$userId",
  component: Component,
});

export default UserRoute;
