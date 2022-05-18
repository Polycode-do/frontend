import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/nav-bar";
import LandingPage from "./routes";
import Challenge from "./routes/challenge/:challengeId";
import Exercise from "./routes/exercise/:exerciseId";
import ExercisePlayground from "./routes/exercise/:exerciseId/playground";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="challenge/:challengeId" element={<Challenge />}>
          <Route path="exercise/:exerciseId" element={<Exercise />} />
        </Route>
        <Route
          path="exercise/:exerciseId/playground"
          element={<ExercisePlayground />}
        />
      </Routes>
    </BrowserRouter>
  );
}
