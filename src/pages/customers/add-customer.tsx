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
import { customersRequest, useRegisterCustomerMutation } from "../../api";

export function AddCustomer() {
  const { handleSubmit, register, formState } = useForm<customersRequest>({
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const registerUpgraded: UseFormRegister<customersRequest> = (
    name,
    ...params
  ) => {
    const error = formState.errors[name]?.message;
    return {
      ...register(name, ...params),
      error,
    };
  };

  const navigate = useNavigate();
  const {
    mutateAsync: registerCustomer,
    isLoading,
    error,
  } = useRegisterCustomerMutation();
  const onSubmit = async (data: customersRequest) => {
    console.log("data:", data);
    try {
      await registerCustomer({
        ...data,
      });
      navigate("/customers");
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
            <Typography>Register Customer </Typography>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Full Name"
                  {...registerUpgraded("fullName", {
                    required: "Username is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Phone Number"
                  {...registerUpgraded("phoneNumber", {
                    required: "Password is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Address"
                  {...registerUpgraded("address", {
                    required: "Username is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Username"
                  {...registerUpgraded("userName", {
                    required: "Password is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="password"
                  {...registerUpgraded("password", {
                    required: "Username is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Promised Share"
                  type="number"
                  {...registerUpgraded("totalSharePromised", {
                    required: "Password is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  type="number"
                  label="Paid Share"
                  {...registerUpgraded("totalSharePaid", {
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
