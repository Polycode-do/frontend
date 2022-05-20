import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/nav-bar";
import Index from "./routes/index";
import Challenge from "./routes/challenge/:challengeId";
import Exercise from "./routes/exercise/:exerciseId";
import ExercisePlayground from "./routes/exercise/:exerciseId/playground";
import LandingPage from "./routes/landing-page";
import { createTheme, ThemeProvider } from "@mui/material";
import { User } from "./models/user";
import { createContext, useEffect, useState } from "react";
import { getSelf } from "./services/user";

export type ContextData = {
  user?: User;
};

export const theme = createTheme();

export const UserContext = createContext<ContextData>({});

export default function App() {
  const [state, setState] = useState<{ user?: User }>({});

  const navigate = useNavigate();

  useEffect(() => {
    async function changeUser() {
      const reply = await getSelf();

      setState({ ...state, user: reply.user });
    }

    changeUser();
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user: state.user }}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="landingpage" element={<LandingPage />} />
          <Route path="challenge/:challengeId" element={<Challenge />}>
            <Route path="exercise/:exerciseId" element={<Exercise />} />
          </Route>
          <Route
            path="exercise/:exerciseId/playground"
            element={<ExercisePlayground />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
