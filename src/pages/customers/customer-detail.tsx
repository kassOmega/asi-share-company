import { Grid, Stack, Button, Typography, Box } from "@mui/material";
import {
  useDeleteCustomerMutation,
  useGetCustomerByIdQuery,
  useUserToken,
} from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerListLayout } from "./common";
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
      <CustomerListLayout header={"Customer Detail "}>
        <Stack
          spacing={4}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={2}
          boxShadow={2}
          p={8}
          pt={4}
        >
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            pl={8}
          >
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
            <Grid item xs={6} md={6}>
              <Typography>Promised Share To Buy</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{user?.data.totalSharePromised}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>Paid Share</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{user?.data.totalSharePaid}</Typography>
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
