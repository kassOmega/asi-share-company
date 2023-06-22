import {
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
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={12} md={6}>
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
          <Typography>Welcome To ASI</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
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
            <Typography>Login </Typography>
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
      </Grid>
    </Grid>
  );
}
