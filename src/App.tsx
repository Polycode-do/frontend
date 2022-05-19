import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/nav-bar";
import Index from "./routes/index";
import Challenge from "./routes/challenge/:challengeId";
import Exercise from "./routes/exercise/:exerciseId";
import ExercisePlayground from "./routes/exercise/:exerciseId/playground";
import LandingPage from "./routes/landing-page";
import { createTheme, ThemeProvider } from "@mui/material";

export const theme = createTheme();

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
