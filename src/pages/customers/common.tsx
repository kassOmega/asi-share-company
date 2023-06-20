import {
  Grid,
  Stack,
  Box,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { ReactNode } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { CustomersResponse, useUserToken } from "../../api";
import jwt_decode from "jwt-decode";

export const Display = ({ user }: { user: CustomersResponse }) => {
  const navigate = useNavigate();
  const { isLoggedIn, token } = useUserToken();
  let decoded: any;
  if (isLoggedIn) decoded = jwt_decode(token ?? "");

  return (
    <Stack
      boxShadow={2}
      borderRadius={4}
      padding={2}
      alignItems="center"
      sx={{ backgroundColor: "#f2f2f2" }}
    >
      <Stack alignItems="center" justifyItems="center" px={4}>
        <Avatar src={user.fullName} sx={{ m: 2, width: 90, height: 90 }} />
        <Grid container>
          <Grid item xs={5} md={4}>
            <Typography sx={{ fontSize: 12 }}>Full Name</Typography>
          </Grid>
          <Grid item xs={1} md={1}>
            <Typography sx={{ fontSize: 12 }}>:</Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <Typography sx={{ fontSize: 12 }}>{user.fullName}</Typography>
          </Grid>
          <Grid item xs={5} md={4}>
            <Typography sx={{ fontSize: 12 }}>Address</Typography>
          </Grid>
          <Grid item xs={1} md={1}>
            <Typography sx={{ fontSize: 12 }}>:</Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <Typography sx={{ fontSize: 12 }}>{user.address}</Typography>
          </Grid>
          <Grid item xs={5} md={4}>
            <Typography sx={{ fontSize: 12 }}>Phone Number</Typography>
          </Grid>
          <Grid item xs={1} md={1}>
            <Typography sx={{ fontSize: 12 }}>:</Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <Typography sx={{ fontSize: 12 }}>{user.phoneNumber}</Typography>
          </Grid>
          <Grid></Grid>
          <Grid item xs={6} md={12} alignSelf="center">
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              paddingTop={4}
              sx={{
                justifyItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: `${user.fullyPayed ? "green" : "red"}`,
                  borderRadius: 100,
                  height: 24,
                  width: 24,
                }}
              />
              <Typography>
                {`${
                  user.fullyPayed
                    ? "Fully Paid"
                    : `Unpaid  ${user.totalSharePromised - user.totalSharePaid}`
                }`}
              </Typography>
              <Box flex={1} />
              <Button
                variant="outlined"
                size="small"
                sx={{ cursor: "pointer" }}
                component={Link}
                to={`/customers/${user.id}`}
              >
                Detail
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {decoded.role === "admin" && (
          <Button
            onClick={() => navigate(`/customers/update/${user.id}`)}
            variant="outlined"
            size="small"
          >
            update payment
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export interface SimpleDialogProps {
  user?: CustomersResponse;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { user } = props;

  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/customers");
  };
  const { isLoggedIn, token } = useUserToken();
  let decoded: any;
  if (isLoggedIn) decoded = jwt_decode(token ?? "");

  return (
    <Dialog onClose={handleClose} open={!!user}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <Grid container>
            <Grid item xs={6} md={6}>
              <Typography>Full Name</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{user?.fullName}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>Address</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{user?.address}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>Phone Number</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography>{user?.phoneNumber}</Typography>
            </Grid>
          </Grid>

          {decoded.role === "admin" && (
            <Box alignItems={"flex-end"} alignSelf={"end"} display="block">
              <Button variant="contained" color="error" size="small">
                Delete
              </Button>
            </Box>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export function FilterMenu() {
  const navigate = useNavigate();

  return (
    <Stack alignItems="flex-start" paddingLeft={4}>
      <Stack alignItems={"center"} direction="row">
        <Typography>
          <FilterAltIcon sx={{ fontSize: 40 }} />
        </Typography>
        <Typography
          sx={{
            cursor: "default",
          }}
        >
          Filter
        </Typography>
      </Stack>
      <Stack flexDirection="column" paddingLeft={10}>
        <Typography
          onClick={() => {
            navigate("/customers");
          }}
          color={"#2A9260"}
          sx={{ cursor: "pointer" }}
        >
          All share holders
        </Typography>
        <Typography
          color={"#2A9260"}
          onClick={() => {
            navigate("/customers/fully-paid");
          }}
          sx={{ cursor: "pointer" }}
        >
          Fully Paid
        </Typography>
        <Typography
          color={"#2A9260"}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/customers/fully-unpaid");
          }}
        >
          Fully Unpaid
        </Typography>
      </Stack>
    </Stack>
  );
}

export const CustomerListLayout = ({
  header,
  children,
}: {
  header: string;
  children: ReactNode;
}) => {
  return (
    <Stack spacing={2} sx={{ backgroundColor: "#ffff" }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={3} pt={2} sx={{ backgroundColor: "#e4e4e4" }}>
          <Stack
            spacing={1}
            sx={{
              "@media (min-width: 600px)": {
                position: "fixed",
              },
            }}
          >
            <Button
              component={Link}
              to="/customers/register"
              variant="outlined"
            >
              Register Customer
            </Button>
            <FilterMenu />
          </Stack>
        </Grid>
        <Grid xs={12} md={9} minHeight={"100vh"}>
          <Stack padding={2} spacing={2}>
            <Typography variant="h4" textAlign="center" paddingTop={2}>
              {header}
            </Typography>
            {children}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
