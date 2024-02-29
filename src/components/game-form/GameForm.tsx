import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { GameFormModelType } from "./GameFormModel";
import React from "react";
import PlayersField from "./PlayersField";

type GameFormProps = {
  model: GameFormModelType;
  onSubmit: (model: GameFormModelType) => void;
};

const GameForm: React.FC<GameFormProps> = ({ model, onSubmit }) => {
  const formMethods = useForm({
    defaultValues: model,
  });
  const winnersArray = useFieldArray({
    control: formMethods.control,
    name: "winners",
  });
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className={"flex flex-col gap-2"}
      >
        <input type="date" {...formMethods.register("playedAt")} />
        <PlayersField />
        <input type="hidden" {...formMethods.register("id")} />
      </form>
    </FormProvider>
  );
};

export default GameForm;
