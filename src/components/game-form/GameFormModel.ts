import { CreateGameDTO, GameDTO } from "../../models/Game";
import { CreatePlayerDTO } from "../../models/Player";

export type GameFormModelType = Omit<CreateGameDTO, "winners"> & {
  id: string;
  winners: {
    userId: string;
  }[];
  players: CreatePlayerDTO[];
};

const create = (
  model: GameDTO,
  players: CreatePlayerDTO[],
): GameFormModelType => {
  return {
    finished: model.finished,
    formatId: model.formatId,
    id: model.id,
    playedAt: model.playedAt,
    players: players,
    winners: model.winners.map((winner) => ({ userId: winner })),
  };
};

const toApiModel = (
  model: GameFormModelType,
): CreateGameDTO & { id: string } => {
  return {
    finished: model.finished,
    formatId: model.formatId,
    id: model.id,
    playedAt: model.playedAt,
    players: model.players,
    winners: model.winners.map((winner) => winner.userId),
  };
};

const GameFormModel = {
  create: create,
  toApiModel: toApiModel,
};

export default GameFormModel;
