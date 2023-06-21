import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, UseFormRegister } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCustomerByIdQuery, useUpdateCustomerMutation } from "../../api";
import { useEffect } from "react";

interface updateRequest {
  totalSharePaid: number;
}

export function UpdateCustomer() {
  const { id } = useParams();
  const { data: result } = useGetCustomerByIdQuery(parseInt(id ?? ""));
  const { handleSubmit, register, formState, reset } = useForm<updateRequest>({
    mode: "onChange",
    reValidateMode: "onBlur",
    // defaultValues: useMemo(() => ({ ...result?.data }), [result]),
  });

  useEffect(() => {
    reset(result?.data);
  }, [result?.data, reset]);

  const registerUpgraded: UseFormRegister<updateRequest> = (
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
  } = useUpdateCustomerMutation();

  const onSubmit = async (data: updateRequest) => {
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
            <Typography>
              {result?.data.totalSharePaid} of {result?.data.totalSharePromised}{" "}
              total shares has been previously paid{" "}
            </Typography>
            <Grid container spacing={2}>
              {/* <Grid item md={6} xs={12}>
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
                    required: "Password is required",
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
                  label="Promised Share"
                  type="number"
                  {...registerUpgraded("totalSharePromised", {
                    required: "Password is required",
                  })}
                />
              </Grid> */}
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Paid Share"
                  InputProps={{
                    inputProps: {
                      max:
                        (result?.data.totalSharePromised ?? 0) -
                        (result?.data.totalSharePaid ?? 0),
                    },
                  }}
                  {...registerUpgraded("totalSharePaid", {
                    required: "Password is required",
                  })}
                />
              </Grid>
            </Grid>
            {!!error && (
              <Typography>Something went wrong! Please try again</Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <CircularProgress size="20px" /> : "Update"}
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
}
