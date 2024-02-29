import { useForm, FormProvider } from "react-hook-form";
import { Deck } from "../queries/useDeckQuery";

type DeckFormProps = {
  model: Deck;
  onSubmit: (model: Deck) => void;
};

const DeckForm: React.FC<DeckFormProps> = ({ model, onSubmit }) => {
  const formMethods = useForm({
    defaultValues: model,
  });
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <label htmlFor="commander">Commander:</label>
        <input
          className="bg-transparent rounded-md border border-slate-50"
          type="text"
          {...formMethods.register("commander")}
        />
        <label htmlFor="commander">Decklist:</label>
        <input
          type="text"
          className="bg-transparent rounded-md border border-slate-50"
          {...formMethods.register("decklistUrl")}
        />
        <input type="hidden" {...formMethods.register("owner")} />
        <input type="hidden" {...formMethods.register("id")} />
        <button type={"submit"}>Submit</button>
      </form>
    </FormProvider>
  );
};

export default DeckForm;
