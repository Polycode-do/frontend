import axios from "axios";
import { Exercise, ExerciseCompletion } from "../models/exercise";
import { buildAxiosHeaders } from "../utils/axios";

export async function getExercise(exerciseId: number) {
  try {
    const reply = await axios.get<{ message: string; exercise: Exercise }>(
      `/exercise/${exerciseId}`,
      {
        headers: buildAxiosHeaders(
          sessionStorage.getItem("access_token") || ""
        ),
      }
    );
    return { success: "Exercise found", exercise: reply.data.exercise };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      return {
        error: (err.response.data as { message: string }).message,
      };
    }
    console.error(err);
    return {
      error:
        "Sorry, it seems there is some problem reaching our API. Please contact and administrator.",
    };
  }
}

export async function getExercises() {
  try {
    const reply = await axios.get<{
      message: string;
      exercises: {
        exercise: Exercise;
        completions: ExerciseCompletion[];
      }[];
    }>(`/exercise`, {
      headers: buildAxiosHeaders(sessionStorage.getItem("access_token") || ""),
    });
    return {
      success: "Exercise found",
      exercises: reply.data.exercises,
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      return {
        error: (err.response.data as { message: string }).message,
      };
    }
    console.error(err);
    return {
      error:
        "Sorry, it seems there is some problem reaching our API. Please contact and administrator.",
    };
  }
}

export async function testExercise(
  exerciseId: number,
  code: string,
  language: string
) {
  try {
    const reply = await axios.post<{
      message: string;
      exerciseCompletion: number;
      stdout: string;
      stderr: string;
    }>(
      `/exercise/${exerciseId}/test`,
      {
        code,
        language,
      },
      {
        headers: buildAxiosHeaders(
          sessionStorage.getItem("access_token") || ""
        ),
      }
    );
    return {
      success: "Exercise tested",
      exerciseCompletion: reply.data.exerciseCompletion,
      stdout: reply.data.stdout,
      stderr: reply.data.stderr,
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      return {
        error: (err.response.data as { message: string }).message,
      };
    }
    console.error(err);
    return {
      error:
        "Sorry, it seems there is some problem reaching our API. Please contact and administrator.",
    };
  }
}
