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
import { BoardRequest, useRegisterBoardMutation } from "../../api";

export function AddBoard() {
  const { handleSubmit, register, formState } = useForm<BoardRequest>({
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const registerUpgraded: UseFormRegister<BoardRequest> = (name, ...params) => {
    const error = formState.errors[name]?.message;
    return {
      ...register(name, ...params),
      error,
    };
  };

  const navigate = useNavigate();
  const {
    mutateAsync: registerBoard,
    isLoading,
    error,
  } = useRegisterBoardMutation();
  const onSubmit = async (data: BoardRequest) => {
    console.log("data:", data);
    try {
      await registerBoard({
        ...data,
      });
      navigate("/board");
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
            <Typography>Register Board Member </Typography>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  size="small"
                  label="Full Name"
                  {...registerUpgraded("fullName", {
                    required: "Full name is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  size="small"
                  label="Phone Number"
                  {...registerUpgraded("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  size="small"
                  label="Address"
                  fullWidth
                  {...registerUpgraded("address", {
                    required: "Address is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  size="small"
                  label="Username"
                  {...registerUpgraded("userName", {
                    required: "Username is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  size="small"
                  label="password"
                  {...registerUpgraded("password", {
                    required: "Password is required",
                  })}
                />
              </Grid>
            </Grid>
            {!!error && (
              <Typography>Something went wrong! Please try again</Typography>
            )}
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? <CircularProgress size="20px" /> : "Login"}
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
}
