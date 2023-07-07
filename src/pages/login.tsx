import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, UseFormRegister } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api";
import { ReactComponent as LogoSvg } from "./logo.svg";
import { ReactComponent as SidePanelSvg } from "./side-panel.svg";

type FormModel = {
  userName: string;
  password: string;
};

export function LoginPage() {
  const { handleSubmit, register, formState } = useForm<FormModel>({
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const registerUpgraded: UseFormRegister<FormModel> = (name, ...params) => {
    const error = formState.errors[name]?.message;
    return {
      ...register(name, ...params),
      error,
    };
  };

  const navigate = useNavigate();
  const { mutateAsync: login, isLoading, error } = useLoginMutation();
  const onSubmit = async ({ password, userName }: FormModel) => {
    try {
      await login({
        password,
        userName,
      });
      navigate("/");
    } catch {
      // wrong username or password
    }
  };
  return (
    <Stack justifyContent={"center"}>
      <Grid container>
        <Grid item xs={12} md={6} alignItems="center">
          <Logo />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              sx={{
                padding: 10,
                "@media (max-width: 600px)": {
                  padding: "10px",
                },
                "@media (max-width: 900px)": {
                  padding: 10,
                },
              }}
              spacing={3}
            >
              <Typography alignSelf="center" variant="h1">
                Welcome to ASI
              </Typography>
              <TextField
                label="Username"
                {...registerUpgraded("userName", {
                  required: "Username is required",
                })}
              />
              <TextField
                type="password"
                label="Password"
                {...registerUpgraded("password", {
                  required: "Password is required",
                })}
              />
              {!!error && <Typography>Wrong username or password</Typography>}
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? <CircularProgress size="20px" /> : "Login"}
              </Button>
            </Stack>
          </form>
        </Grid>{" "}
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="flex-end">
            <ShareImage />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

const ShareImage = () => {
  return <SidePanelSvg height="100vh" />;
};
const Logo = () => {
  return (
    <Box p={2}>
      <LogoSvg width={100} height={100} />
    </Box>
  );
};
