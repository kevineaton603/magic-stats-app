import { CreatePlayerDTO } from "./Player";

export type CreateGameDTO = {
  playedAt: string;
  winners: string[];
  finished: boolean;
  formatId: string;
  players: CreatePlayerDTO[];
};

export type GameDTO = Omit<CreateGameDTO, "players"> & {
  id: string;
};
