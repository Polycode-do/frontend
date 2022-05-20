import axios from "axios";
import { CreateUserDto } from "../models/user";
import { buildAxiosHeaders } from "../utils/axios";

export async function login(
  logins: { email: string; password: string },
  remember: boolean
) {
  try {
    const reply = await axios.post<{ message: string; access_token: string }>(
      `/auth/login`,
      logins,
      { headers: buildAxiosHeaders() }
    );

    if (remember) {
      localStorage.setItem("access_token", reply.data.access_token);
    }

    sessionStorage.setItem("access_token", reply.data.access_token);

    return { success: "User logged in" };
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

export async function register(createUserDto: CreateUserDto) {
  try {
    const reply = await axios.post<{ message: string; access_token: string }>(
      `/auth/register`,
      createUserDto,
      { headers: buildAxiosHeaders() }
    );

    sessionStorage.setItem("access_token", reply.data.access_token);

    return { success: "User registered" };
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

export async function logout() {
  try {
    sessionStorage.removeItem("access_token");
    localStorage.removeItem("access_token");
    return { success: "User logged out" };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
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
