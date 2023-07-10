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
import { CustomersRequest, useRegisterCustomerMutation } from "../../api";
import { useState } from "react";

export function AddCustomer() {
  const { handleSubmit, register, formState } = useForm<CustomersRequest>({
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  const [formError, setError] = useState("");

  const registerUpgraded: UseFormRegister<CustomersRequest> = (
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
  const onSubmit = async (data: CustomersRequest) => {
    console.log("data:", data);
    const { totalSharePaid, totalSharePromised, ...other } = data;
    if (totalSharePaid > totalSharePromised) {
      setError("Paid share should not exceed the promised share");
      return;
    }
    try {
      await registerCustomer({
        ...other,
        totalSharePaid: parseInt("" + totalSharePaid),
        totalSharePromised: parseInt("" + totalSharePromised),
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
                  size="small"
                  label="Full Name"
                  {...registerUpgraded("fullName", {
                    required: "Username is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  size="small"
                  label="Phone Number"
                  {...registerUpgraded("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  size="small"
                  label="Address"
                  {...registerUpgraded("address", {
                    required: "Username is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  size="small"
                  label="Customer Id"
                  {...registerUpgraded("customerID", {
                    required: "Customer Id is required",
                  })}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  size="small"
                  label="Promised Share"
                  type="number"
                  {...registerUpgraded("totalSharePromised", {
                    required: "Promised Share is required",
                  })}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  size="small"
                  InputProps={{}}
                  type="number"
                  defaultValue={0}
                  label="Paid Share"
                  {...registerUpgraded("totalSharePaid", {
                    required: "Paid Share is required",
                  })}
                />
              </Grid>
            </Grid>
            <Stack>
              {!!error && (
                <Typography sx={{ color: "red" }}>
                  Something went wrong! Please try again
                </Typography>
              )}
              {!!formError && (
                <Typography sx={{ color: "red" }}>{formError}</Typography>
              )}
            </Stack>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? <CircularProgress size="20px" /> : "Register"}
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
}
