import axios from "axios";
import { Challenge, ChallengeCompletion } from "../models/challenge";
import { buildAxiosHeaders } from "../utils/axios";

export async function getchallenge(challengeId: number) {
  try {
    const reply = await axios.get<{ message: string; challenge: Challenge }>(
      `/challenge/${challengeId}`,
      {
        headers: buildAxiosHeaders(
          sessionStorage.getItem("access_token") || ""
        ),
      }
    );
    return { success: "User found", challenge: reply.data.challenge };
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

export async function getchallenges() {
  try {
    const reply = await axios.get<{
      message: string;
      challenges: {
        challenge: Challenge;
        completions: ChallengeCompletion[];
      }[];
    }>(`/challenge`, {
      headers: buildAxiosHeaders(sessionStorage.getItem("access_token") || ""),
    });
    return {
      success: "User found",
      challenges: reply.data.challenges,
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
