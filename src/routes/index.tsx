import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextData, UserContext } from "../App";
import { Tile } from "../components/tile";
import { Challenge, ChallengeCompletion } from "../models/challenge";
import { Exercise, ExerciseCompletion } from "../models/exercise";
import { getchallenges } from "../services/challenge";
import { getExercises } from "../services/exercise";

export default function Index() {
  const navigate = useNavigate();

  const { user } = useContext<ContextData>(UserContext);

  let [exercises, setExercises] = useState(
    [] as { exercise: Exercise; completions: ExerciseCompletion[] }[]
  );

  let [challenges, setChallenges] = useState(
    [] as { challenge: Challenge; completions: ChallengeCompletion[] }[]
  );

  if (!user) navigate("/landingpage");

  useEffect(() => {
    async function fetchExercises() {
      const exercisesResult = await getExercises();

      if (exercisesResult.exercises) setExercises(exercisesResult.exercises);
    }

    async function fetchChallenges() {
      const challengesResult = await getchallenges();

      if (challengesResult.challenges)
        setChallenges(challengesResult.challenges);
    }

    fetchExercises();
    fetchChallenges();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: "500px",
          backgroundColor: "#59656F",
          "&::after": {
            position: "absolute",
            content: "''",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "rgba(0,0,0,0.5)",
          },
        }}
      >
        <img
          src={`${exercises.at(0)?.exercise.image}`}
          style={{
            objectFit: "cover",
            display: "block",
            margin: "auto",
          }}
          alt="Challenge of the day"
          height="500px"
        />
        <Link to={`/exercise/${exercises.at(0)?.exercise.id}/playground`}>
          <Typography
            variant="h2"
            color="white"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontWeight: "bold",
              transform: "translate(-50%, -100%)",
              zIndex: 1,
            }}
          >
            {exercises.at(0)?.exercise.name}
          </Typography>
        </Link>
      </Box>
      <Box sx={{ transform: "translate(0, -150px)" }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", marginLeft: "20px", marginBottom: "20px" }}
          color="white"
        >
          Last Exercises
        </Typography>
        <Grid container spacing={2}>
          {exercises.slice(0, 6).map((exercise, index) => (
            <Grid key={index} item>
              <Tile
                object={{
                  ...exercise.exercise,
                  progress: exercise.completions.at(0)?.completion || 0,
                }}
                links={[
                  {
                    name: "Try it !",
                    link: `/exercise/${exercise.exercise.id}/playground`,
                  },
                  {
                    name: "Get to the challenge",
                    link: `/challenge/${exercise.exercise.id}`,
                  },
                ]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", marginLeft: "20px", marginBottom: "20px" }}
        >
          Challenges
        </Typography>
        <Grid container spacing={2}>
          {challenges.map((challenge, index) => (
            <Grid key={index} item>
              <Tile
                object={{
                  ...challenge.challenge,
                  progress: challenge.completions.at(0)?.completion || 0,
                }}
                links={[
                  {
                    name: "Show",
                    link: `/challenge/${challenge.challenge.id}`,
                  },
                ]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", marginLeft: "20px", marginBottom: "20px" }}
        >
          Exercises
        </Typography>
        <Grid container spacing={2}>
          {exercises.map(
            (exercise, index) => (
              (
                <Grid key={index} item>
                  <Tile
                    object={{
                      ...exercise.exercise,
                      progress: exercise.completions.at(0)?.completion || 0,
                    }}
                    links={[
                      {
                        name: "Try it !",
                        link: `/exercise/${exercise.exercise.id}/playground`,
                      },
                      {
                        name: "Get to the challenge",
                        link: `/challenge/${exercise.exercise.id}`,
                      },
                    ]}
                  />
                </Grid>
              )
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
}
