import { Combobox } from "@headlessui/react";
import { useMemo, useState } from "react";
import useUsersQuery from "../../queries/useUsersQuery";
import { useFieldArray, useFormContext } from "react-hook-form";
import { GameFormModelType } from "./GameFormModel";
import UserIcon from "../UserIcon";
import useUserDecksQuery from "../../queries/useUserDecksQuery";

const PlayersField = () => {
  const usersQuery = useUsersQuery();
  const formMethods = useFormContext<GameFormModelType>();
  const playersArray = useFieldArray({
    control: formMethods.control,
    name: "players",
  });
  const [query, setQuery] = useState("");
  const users = useMemo(
    () => (usersQuery?.data?.pages ?? []).flatMap((x) => x.users),
    [usersQuery?.data],
  );
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.id.toLowerCase().includes(query.toLowerCase()) ||
          user.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, users],
  );
  return (
    <Combobox
      value={query}
      onChange={(player) => {
        playersArray.append({ userId: player, deckId: "" });
        setQuery("");
      }}
    >
      <div className="relative w-full">
        <label htmlFor="players">Select Palyers:</label>
        <Combobox.Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={"w-full"}
        />
        <Combobox.Options
          className={
            "absolute mt-1 bg-slate-800 rounded-md flex flex-col gap-1 p-1"
          }
        >
          {usersQuery?.data
            ? filteredUsers.map((user) => (
                <Combobox.Option key={user.id} value={user.id}>
                  {({ active, disabled, selected }) => (
                    <div className="flex z-10 border-2 border-emerald-600 p-1 hover:bg-slate-500 rounded-md cursor-pointer">
                      <UserIcon userId={user.id} />
                      <span>{user.name}</span>
                    </div>
                  )}
                </Combobox.Option>
              ))
            : "Loading..."}
        </Combobox.Options>
        <div className="grid grid-cols-3">
          {playersArray.fields.map((user, i) => (
            <div className="flex z-10 border-2 border-emerald-600 p-1 hover:bg-slate-500 rounded-md">
              <UserIcon userId={user.userId} />
              <div className="flex-1">
                <div className="flex flex-row justify-between">
                  <span>{user.userId}</span>
                  <button className="">Delete</button>
                </div>
                <label htmlFor={`players.${i}.deckId`}>Deck:</label>
                <input />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Combobox>
  );
};

const DeckField: React.FC<{ index: number; userId: string }> = ({
  index,
  userId,
}) => {
  const formMethods = useFormContext<GameFormModelType>();
  const decksQuery = useUserDecksQuery(userId);
  return (
    <>
      <label htmlFor={`players.${index}.deckId`}>Deck:</label>
      <input />
    </>
  );
};

export default PlayersField;
