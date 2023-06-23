import { Grid, Stack, Button, Typography, Box } from "@mui/material";
import {
  useDeleteCustomerMutation,
  useGetCustomerByIdQuery,
  useGetCustomersQuery,
  useUserToken,
} from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CustomerListLayout, Display, SimpleDialog } from "./common";
import { capitalizeFullName } from "../../common";

export const CustomerDetail = () => {
  const { user: useRole } = useUserToken();
  const { id } = useParams();
  const deleteCustomer = useDeleteCustomerMutation();
  const navigate = useNavigate();
  const { data: user } = useGetCustomerByIdQuery(parseInt(id ?? ""));
  function handleDelete() {
    deleteCustomer.mutate(id ?? "", {
      onSuccess: () => {
        navigate("/customers");
      },
    });
  }
  return (
    <Stack padding={2} spacing={2}>
      <CustomerListLayout header="Share Holders List">
        <Stack spacing={4}>
          <Grid container>
            <Grid item xs={6} md={6}>
              <Typography>Full Name</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>
                {capitalizeFullName(user?.data.fullName ?? "")}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>Address</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{user?.data.address}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>Phone Number</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{user?.data.phoneNumber}</Typography>
            </Grid>
          </Grid>

          {useRole?.role === "admin" && (
            <Box alignItems={"flex-end"} alignSelf={"end"} display="block">
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          )}
        </Stack>
      </CustomerListLayout>
    </Stack>
  );
};
