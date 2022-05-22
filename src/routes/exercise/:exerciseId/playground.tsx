import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData, theme, UserContext } from "../../../App";
import { Box } from "@mui/system";
import ReactMarkdown from "react-markdown";
import AceEditor from "react-ace";
import {
  Alert,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { getExercise, testExercise } from "../../../services/exercise";
import { Exercise } from "../../../models/exercise";

export default function ExercisePlayground() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ ...state, loading: true });

    const testResult = await testExercise(
      parseInt(exerciseId || "0"),
      state.code,
      state.language
    );
    console.log(testResult);
    setState({
      ...state,
      loading: false,
      alerts: {
        error: testResult.stdout || "",
        result: testResult.stderr || "",
      },
    });
  }

  const { exerciseId } = useParams();

  const navigate = useNavigate();

  const { user } = useContext<ContextData>(UserContext);

  const phone = useMediaQuery(theme.breakpoints.down("md"));

  const [state, setState] = useState<{
    code: string;
    language: string;
    loading: boolean;
    exercise?: Exercise;
    alerts: {
      error: string;
      result: string;
    };
  }>({
    code: "",
    language: "javascript",
    loading: false,
    exercise: undefined,
    alerts: {
      error: "",
      result: "",
    },
  });

  if (!user || !exerciseId) navigate("/landingpage");

  useEffect(() => {
    async function fetchExercise() {
      const exerciseResponse = await getExercise(parseInt(exerciseId || "0"));

      if (exerciseResponse.exercise)
        setState({
          ...state,
          exercise: exerciseResponse.exercise,
          code: exerciseResponse.exercise.baseCode,
        });
    }
    fetchExercise();
  }, []);

  return (
    <Box sx={{ display: "flex", width: "100%", height: "90vh" }}>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          marginTop: "20px",
          overflowWrap: "break-word",
          overflowY: "scroll",
        }}
      >
        <Typography textAlign="center" variant="h2">
          {state.exercise?.name}
        </Typography>
        <ReactMarkdown>{state.exercise?.subject || "no subject"}</ReactMarkdown>
      </Box>
      <Box sx={{ width: "50%", height: "100%", marginTop: "20px" }}>
        <AceEditor
          style={{ width: "100%", height: "80%" }}
          mode={state.language}
          theme="github"
          onChange={(code) => setState({ ...state, code })}
          name="code"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
        <Box
          sx={{ marginTop: "20px" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6">Language :</Typography>
            <select
              name="language"
              id="language"
              onChange={(language) =>
                setState({ ...state, language: language.target.value })
              }
            >
              <option value="javascript">javascript</option>
              <option value="java">java</option>
              <option value="python">python</option>
              <option value="rust">rust</option>
            </select>
          </Box>
          {Boolean(state.alerts.result?.length) && (
            <Alert sx={{ marginTop: "10px" }} severity="info">
              {state.alerts.result}
            </Alert>
          )}
          {Boolean(state.alerts.error?.length) && (
            <Alert sx={{ marginTop: "10px" }} severity="error">
              {state.alerts.error}
            </Alert>
          )}
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              disabled={state.loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Run the code
            </Button>
            {state.loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-10px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
