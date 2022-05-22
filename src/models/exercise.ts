import { Challenge } from "./challenge";
import { User } from "./user";

export type Exercise = {
  id: number;
  
  name: string;

  description: string;

  image: string;

  baseCode: string;

  subject: string;

  challenge: Challenge;

  creator: User;

  createdAt: string;

  updatedAt: string;
};

export type ExerciseCompletion = {
  exerciseId: number;

  userId: number;

  completion: number;

  succeeded: boolean;

  createdAt: string;

  updatedAt: string;
};
