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
import { CustomerListLayout } from "./common";
import { ReactComponent as Logo } from "../logo.svg";

export function AddCustomer() {
  const { handleSubmit, register, formState, watch } =
    useForm<CustomersRequest>({
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
  const promisedBirr = parseInt(watch("totalSharePromised") + "") * 2000;
  const navigate = useNavigate();
  const {
    mutateAsync: registerCustomer,
    isLoading,
    error,
  } = useRegisterCustomerMutation();
  const onSubmit = async (data: CustomersRequest) => {
    const { totalSharePaid, totalSharePromised, ...other } = data;
    if (parseInt(totalSharePaid + "") > parseInt(totalSharePromised + "")) {
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
    <CustomerListLayout header="Register Customer">
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12} md={4}>
          <Stack alignItems="center" justifyContent="center">
            <Logo height={200} width={200} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
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
              {/* <Stack alignItems="center">
                <Avatar sx={{ width: 90, height: 90 }} />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={(event) =>
                    setSelectedFile(event?.target?.files?.[0])
                  }
                />
                <label htmlFor="rais+1 (103) 841-5217ed-button-file">
                  <Button variant="outlined" component="span">
                    Set profile picture
                  </Button>
                </label>
              </Stack> */}
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
                    defaultValue={5}
                    type="number"
                    {...registerUpgraded("totalSharePromised", {
                      required: "Promised Share is required",
                      validate: {
                        positiveNumber: (value) => parseInt(value + "") > 4,
                      },
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
                      // validate: {
                      //   positiveNumber: (value) =>
                      //     parseInt(value + "") <=
                      //       parseInt(watch("totalSharePromised") + "") &&
                      //     parseInt(value + "") >= 0,
                      // },
                    })}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    size="small"
                    label="Promised Birr"
                    value={promisedBirr ?? 0}
                    type="number"
                    {...registerUpgraded("totalSharePromisedAmount", {
                      required: "Promised Share is required",
                      validate: {
                        positiveNumber: (value) => parseInt(value + "") >= 5,
                      },
                    })}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    size="small"
                    label="Service Charge"
                    {...registerUpgraded("ServiceCharge", {
                      required: "Service Charge is required",
                      validate: {
                        positiveNumber: (value) =>
                          parseFloat(value + "") >= 0.0,
                      },
                    })}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    size="small"
                    InputProps={{}}
                    type="number"
                    defaultValue={0}
                    label="Paid Birr"
                    {...registerUpgraded("totalSharePaidAmount", {
                      required: "Paid Share is required",
                      // validate: {
                      //   positiveNumber: (value) =>
                      //     parseInt(value + "") >= 0 ||
                      //     parseInt(watch("totalSharePromisedAmount") + "") >=
                      //       parseInt(value + ""),
                      // },
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
    </CustomerListLayout>
  );
}
