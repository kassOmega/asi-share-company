import {
  Grid,
  Stack,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  useDeleteCustomerMutation,
  useGetCustomerByIdQuery,
  useUserToken,
} from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerListLayout } from "./common";
import { DeleteDialog, capitalizeFullName } from "../../common";
import { useState } from "react";
import { useSnackbar } from "notistack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const CustomerDetail = () => {
  const { user: useRole } = useUserToken();
  const { id } = useParams();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const deleteCustomer = useDeleteCustomerMutation();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetCustomerByIdQuery(parseInt(id ?? ""));
  function handleDelete() {
    deleteCustomer.mutate(id ?? "", {
      onSuccess: () => {
        navigate("/customers");
        enqueueSnackbar("User Successfully Deleted", { variant: "success" });
      },
    });
  }
  return (
    <Stack padding={2} spacing={2}>
      <CustomerListLayout header={"Customer Detail "} isDetail>
        <Box flexDirection={"row"} alignItems="center">
          <ArrowBackIcon
            sx={{ fontSize: 30, cursor: "pointer" }}
            onClick={() => navigate("/customers")}
          />
        </Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Stack
            spacing={4}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={2}
            boxShadow={2}
            p={8}
          >
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                "@media (min-width: 600px)": {
                  paddingLeft: 8,
                },
              }}
            >
              <Grid item xs={6} md={6}>
                <Typography>Full Name</Typography>
              </Grid>
              <Grid item xs={6} md={6} left={-8}>
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
              <Grid item xs={6} md={6}>
                <Typography>Promised Share in Birr</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{user?.data.totalSharePromisedAmount}</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>Paid Share in Birr</Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>{user?.data.totalSharePaidAmount}</Typography>
              </Grid>
            </Grid>

            {useRole?.role === "admin" && (
              <Box alignItems={"flex-end"} alignSelf={"end"} display="block">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Stack>
        )}
        <DeleteDialog
          onClose={() => setConfirmDelete(false)}
          open={confirmDelete}
          onDelete={handleDelete}
        />
      </CustomerListLayout>
    </Stack>
  );
};
