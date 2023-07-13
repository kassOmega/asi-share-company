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
import { useNavigate, useParams } from "react-router-dom";
import {
  CustomersRequest,
  useDeleteCustomerMutation,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useUpdateCustomerPaymentMutation,
  useUserToken,
} from "../../api";
import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../logo.svg";
import { CustomerListLayout } from "./common";
import { DeleteDialog } from "../../common";
import { useSnackbar } from "notistack";
interface updateRequest {
  totalSharePaid: number;
}

export function UpdateCustomer({ isFullUpdate }: { isFullUpdate?: boolean }) {
  const { id } = useParams();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const deleteCustomer = useDeleteCustomerMutation();
  const { user: useRole } = useUserToken();
  const { data: result } = useGetCustomerByIdQuery(parseInt(id ?? ""));
  const { handleSubmit, register, formState, reset, watch } =
    useForm<CustomersRequest>({
      mode: "onChange",
      reValidateMode: "onBlur",
      // defaultValues: useMemo(() => ({ ...result?.data }), [result]),
    });

  useEffect(() => {
    reset(result?.data);
  }, [result?.data, reset]);

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
    mutateAsync: updateCustomerPayment,
    isLoading: paymentLoading,
    error: paymentError,
  } = useUpdateCustomerPaymentMutation();
  const {
    mutateAsync: updateCustomer,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateCustomerMutation(id ?? "");

  const onPaymentSubmit = async (data: updateRequest) => {
    console.log("data:", data);
    const { totalSharePaid } = data;
    try {
      await updateCustomerPayment({
        totalSharePaid: parseInt("" + totalSharePaid),
      });
      navigate("/customers");
    } catch {
      // wrong username or password
    }
  };
  const onUpdateSubmit = async (data: CustomersRequest) => {
    console.log("data:", data);

    const { totalSharePaid, totalSharePromised, ...other } = data;
    try {
      await updateCustomer({
        ...other,
        totalSharePaid: parseInt("" + totalSharePaid),
        totalSharePromised: parseInt("" + totalSharePromised),
      });
      navigate("/customers");
    } catch {
      // wrong username or password
    }
  };
  function handleDelete() {
    deleteCustomer.mutate(id ?? "", {
      onSuccess: () => {
        navigate("/customers");
        enqueueSnackbar("User Successfully Deleted", { variant: "success" });
      },
    });
  }
  const paymentUpdate = (
    <form onSubmit={handleSubmit(onPaymentSubmit)}>
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
        <Typography>
          {result?.data.totalSharePaid} of {result?.data.totalSharePromised}{" "}
          total shares has been previously paid{" "}
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
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
                required: "Paid Share is required",
              })}
            />
          </Grid>
        </Grid>
        {!!paymentError && (
          <Typography color="red">
            Something went wrong! Please try again
          </Typography>
        )}
        <Button type="submit" variant="contained" disabled={paymentLoading}>
          {paymentLoading ? <CircularProgress size="20px" /> : "Update"}
        </Button>
      </Stack>
    </form>
  );

  const fullUpdate = (
    <form onSubmit={handleSubmit(onUpdateSubmit)}>
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
        {/* <Typography>Register Customer </Typography>
        <Typography>
          {result?.data.totalSharePaid} of {result?.data.totalSharePromised}{" "}
          total shares has been previously paid{" "}
        </Typography> */}
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              size="small"
              label="Full Name"
              {...registerUpgraded("fullName", {
                required: "Full Name is required",
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
                required: "Address is required",
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
                validate: {
                  positiveNumber: (value) => parseInt(value + "") >= 5,
                },
              })}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
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
                required: "Paid Share is required",
              })}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              size="small"
              label="Promised Birr"
              defaultValue={
                parseInt(watch("totalSharePromisedAmount") + "") * 2000
              }
              type="number"
              {...registerUpgraded("totalSharePromisedAmount", {
                required: "Promised Share is required",
                validate: {
                  positiveNumber: (value) => parseInt(value + "") > 5,
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
                validate: {
                  positiveNumber: (value) =>
                    parseInt(value + "") <
                      parseInt(watch("totalSharePromisedAmount") + "") &&
                    parseInt(value + "") >= 0,
                },
              })}
            />
          </Grid>
        </Grid>
        {!!updateError && (
          <Typography color="red">
            Something went wrong! Please try again
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={updateLoading}
          fullWidth
        >
          {updateLoading ? <CircularProgress size="20px" /> : "Update"}
        </Button>
      </Stack>
    </form>
  );
  return (
    <CustomerListLayout header="Register Customer">
      {isFullUpdate && useRole?.role === "admin" && (
        <Box alignSelf={"end"}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => setConfirmDelete(true)}
          >
            Delete Customer
          </Button>
        </Box>
      )}
      <DeleteDialog
        onClose={() => setConfirmDelete(false)}
        open={confirmDelete}
        onDelete={handleDelete}
      />
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12} md={4}>
          <Stack
            sx={{
              "@media (max-width: 600px)": {
                padding: 10,
              },
              "@media (max-width: 900px)": {
                padding: 10,
              },
            }}
            spacing={3}
          >
            <Logo height={200} width={200} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          {isFullUpdate ? fullUpdate : paymentUpdate}
        </Grid>
      </Grid>
    </CustomerListLayout>
  );
}
