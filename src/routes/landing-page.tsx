import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { theme } from "../App";
import { login, register } from "../services/auth";

type State = {
  inputs: {
    loginEmail: string;
    loginPassword: string;
    remember: boolean;
    firstName: string;
    lastName: string;
    registerEmail: string;
    registerPassword: string;
    confirmPassword: string;
  };
  alerts: {
    loginError?: string;
    registerError?: string;
  };
  loading: string;
};

export default function LandingPage() {
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ ...state, loading: "login" });

    const result = await login(
      { email: state.inputs.loginEmail, password: state.inputs.loginPassword },
      state.inputs.remember
    );

    if (!result.error) navigate("/");

    setState({
      ...state,
      loading: "",
      alerts: { ...state.alerts, loginError: result.error },
    });
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ ...state, loading: "register" });

    if (state.inputs.registerPassword !== state.inputs.confirmPassword) {
      setState({
        ...state,
        alerts: { ...state.alerts, registerError: "Passwords do not match" },
        loading: "",
      });
      return;
    }

    const result = await register({
      email: state.inputs.loginEmail,
      password: state.inputs.loginPassword,
      firstName: state.inputs.firstName,
      lastName: state.inputs.lastName,
    });

    if (!result.error) navigate("/");

    setState({
      ...state,
      loading: "",
      alerts: { ...state.alerts, registerError: result.error },
    });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({ ...state, inputs: { ...state.inputs, [name]: value } });
  }

  const phone = useMediaQuery(theme.breakpoints.up("sm"));

  const [state, setState] = useState<State>({
    inputs: {
      loginEmail: "",
      loginPassword: "",
      remember: false,
      firstName: "",
      lastName: "",
      registerEmail: "",
      registerPassword: "",
      confirmPassword: "",
    },
    alerts: {
      loginError: "",
      registerError: "",
    },
    loading: "",
  });

  const navigate = useNavigate();

  return (
    <Container disableGutters>
      <Typography
        align="center"
        component="h1"
        variant="h5"
        sx={{ fontSize: "40px", marginTop: "100px" }}
      >
        Welcome to Polycode !
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: `${phone ? "row" : "column"}`,
          alignItems: "center",
        }}
      >
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {Boolean(state.alerts.loginError?.length) && (
              <Alert sx={{ marginTop: "10px" }} severity="error">
                {state.alerts.loginError}
              </Alert>
            )}
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleInputChange}
                id="loginEmail"
                disabled={Boolean(state.loading.length)}
                label="Email Address"
                name="loginEmail"
                autoComplete="loginEmail"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={handleInputChange}
                name="loginPassword"
                disabled={Boolean(state.loading.length)}
                label="Password"
                type="password"
                id="loginPassword"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    disabled={Boolean(state.loading.length)}
                    name="remember"
                    id="remember"
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  disabled={Boolean(state.loading.length)}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {state.loading === "login" && (
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
              <Grid container>
                <Grid item xs>
                  <Link to="#">Forgot password?</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Typography
          sx={{ margin: `${phone ? "" : "70px 0 0 0"}` }}
          component="h1"
          variant="h5"
        >
          -- or --
        </Typography>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {Boolean(state.alerts.registerError?.length) && (
              <Alert sx={{ marginTop: "10px" }} severity="error">
                {state.alerts.registerError}
              </Alert>
            )}
            <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    onChange={handleInputChange}
                    name="firstName"
                    disabled={Boolean(state.loading.length)}
                    fullWidth
                    id="firstName"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    onChange={handleInputChange}
                    disabled={Boolean(state.loading.length)}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={handleInputChange}
                    fullWidth
                    disabled={Boolean(state.loading.length)}
                    id="registerEmail"
                    label="Email Address"
                    name="registerEmail"
                    autoComplete="registerEmail"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={handleInputChange}
                    fullWidth
                    name="registerPassword"
                    disabled={Boolean(state.loading.length)}
                    label="Password"
                    type="password"
                    id="registerPassword"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={handleInputChange}
                    disabled={Boolean(state.loading.length)}
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        disabled={Boolean(state.loading.length)}
                        color="primary"
                      />
                    }
                    label="Accept terms and conditions"
                  />
                </Grid>
              </Grid>
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  disabled={Boolean(state.loading.length)}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                {state.loading === "register" && (
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
        </Container>
      </Container>
    </Container>
  );
}
