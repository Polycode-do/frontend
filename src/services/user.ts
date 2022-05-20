import axios from "axios";
import { User } from "../models/user";
import { buildAxiosHeaders } from "../utils/axios";

export async function getSelf() {
  try {
    const reply = await axios.get<{ message: string; user: User }>(`/user/me`, {
      headers: buildAxiosHeaders(sessionStorage.getItem("access_token") || ""),
    });
    return { success: "User found", user: reply.data.user };
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
