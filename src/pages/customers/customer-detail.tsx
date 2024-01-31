import {
  Grid,
  Stack,
  Button,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  ImageList,
  ImageListItem,
} from "@mui/material";
import {
  useDeleteCustomerMutation,
  useGetCustomerByIdQuery,
  useUserToken,
} from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerListLayout } from "./common";
import { DeleteDialog, PictureDialog, capitalizeFullName } from "../../common";
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
  const [showImageDialog, setShowImageDialog] = useState(false);
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
            <Stack sx={{ alignContent: "center", justifyContent: "center" }}>
              {user?.data.profilePicture ? (
                <img
                  src={"/" + user?.data.profilePicture}
                  alt="profile"
                  style={{
                    borderRadius: 200,
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    objectPosition: "center",
                    border: `2px ${
                      user.data.fullyPayed
                        ? "green"
                        : user.data.totalSharePaid > 1
                        ? "yellow"
                        : "red"
                    } solid`,
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 200,
                    height: 200,
                    border: `2px ${
                      user?.data.fullyPayed
                        ? "green"
                        : user?.data?.totalSharePaid ?? 0 > 1
                        ? "yellow"
                        : "red"
                    } solid`,
                  }}
                />
              )}
            </Stack>
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                  "@media (min-width: 600px)": { paddingLeft: 20 },
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
                  <Typography>Customer ID</Typography>
                </Grid>
                <Grid item xs={6} md={6} left={-8}>
                  <Typography>{user?.data.customerID}</Typography>
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

                <Grid item xs={6} md={6}>
                  <Typography>Service Charge</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography>{user?.data.ServiceCharge}</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack>
              {user?.data.attachments && (
                <Stack>
                  <Typography> Uploaded Documents</Typography>

                  <Stack
                    sx={{ flexWrap: "wrap", flexDirection: "row", gap: 2 }}
                  >
                    <ImageList cols={4} rowHeight={40}>
                      {user.data.attachments.map((img) => (
                        <ImageListItem
                          key={img}
                          sx={{
                            cursor: "pointer",
                            backgroundColor: "#d4d4d4",
                            borderRadius: 10,
                          }}
                          onClick={() => setShowImageDialog(true)}
                        >
                          <img src={"/" + img} alt={""} loading="lazy" />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Stack>
                </Stack>
              )}

              <PictureDialog
                onClose={() => setShowImageDialog(false)}
                open={showImageDialog}
                image={user?.data.attachments ?? []}
              />
            </Stack>
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
