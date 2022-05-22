import { Exercise } from "./exercise";
import { User } from "./user";

export type Challenge = {
  id: number;

  name: string;

  description: string;

  image: string;

  exercises: Exercise[];

  creator: User;

  createdAt: string;

  updatedAt: string;
};

export type ChallengeCompletion = {
  completion: number;

  userId: number;

  user: User;

  challenge: Challenge;

  createdAt: string;

  updatedAt: string;
};
