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
  TextField,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { ReactNode } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  CustomersResponse,
  useDeleteCustomerMutation,
  useUserToken,
} from "../../api";
import { capitalizeFullName } from "../../common";
import { useParams } from "../../common/search-param";

export const Display = ({ user }: { user: CustomersResponse }) => {
  // const navigate = useNavigate();
  // const { user: userRole } = useUserToken();

  return (
    <Stack
      boxShadow={2}
      borderRadius={4}
      padding={2}
      spacing={2}
      position="relative"
      sx={{ backgroundColor: "#f2f2f2" }}
    >
      <Stack alignItems="center" justifyItems="center" px={4}>
        <Avatar
          src={"/" + user.profilePicture}
          sx={{ 
            m: 2, width: 90, height: 90,
            border:`1px ${user.fullyPayed?"green":user.totalSharePaid>1?"yellow":"red"} solid` }}

        />
        <Grid container>
          <Grid item xs={5} md={4}>
            <Typography sx={{ fontSize: 12 }}>Full Name</Typography>
          </Grid>
          <Grid item xs={1} md={1}>
            <Typography sx={{ fontSize: 12 }}>:</Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <Typography sx={{ fontSize: 12 }}>
              {capitalizeFullName(user?.fullName ?? "")}
            </Typography>
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
          <Grid item xs={5} md={4}>
            <Typography sx={{ fontSize: 12 }}>Promised Share</Typography>
          </Grid>
          <Grid item xs={1} md={1}>
            <Typography sx={{ fontSize: 12 }}>:</Typography>
          </Grid>
          <Grid item xs={6} md={7}>
            <Typography sx={{ fontSize: 12 }}>
              {user.totalSharePromised}
            </Typography>
          </Grid>

          <Grid item xs={8} md={8}>
            <Typography>
              {`${
                user.fullyPayed
                  ? "Fully Paid"
                  : `Unpaid Share   ${
                      user.totalSharePromised - user.totalSharePaid
                    }`
              }`}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box
              sx={{
                backgroundColor: `${user.fullyPayed ? "green" : "red"}`,
                borderRadius: 100,
                height: 24,
                width: 24,
              }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          size="small"
          sx={{  alignSelf: "flex-start" }}
          component={Link}
          to={`/customers/${user.id}`}
        >
          Detail
        </Button>
{/* 
      <Box sx={{ position: "absolute", right: 4, top: 2 }} padding={0.5}> */}
        <Button
          component={Link}
          to={`/customers/update/${user.id}`}
          variant="outlined"
          size="small"
        >
          Edit
        </Button>
      {/* </Box> */}
        {/* {userRole?.role === "admin" && (
          <Button
            onClick={() => navigate(`/customers/update-payment/${user.id}`)}
            variant="outlined"
            
            sx={{ p: 0.5, px: 1, alignSelf: "flex-end" }}
            size="small"
          >
            update payment
          </Button>
        )} */}
      </Stack>
    </Stack>
  );
};

export interface SimpleDialogProps {
  user?: CustomersResponse;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { user } = props;
  const deleteCustomer = useDeleteCustomerMutation();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/customers");
  };
  const { user: useRole } = useUserToken();

  function handleDelete() {
    deleteCustomer.mutate(user?.id ?? "", {
      onSuccess: () => {
        navigate("/customers");
      },
    });
  }

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
              <Typography>
                {capitalizeFullName(user?.fullName ?? "")}
              </Typography>
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
      </DialogContent>
    </Dialog>
  );
}

export function FilterMenu({ isDetail }: { isDetail?: boolean }) {
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
  isDetail,
}: {
  header: string;
  children: ReactNode;
  isDetail?: boolean;
}) => {
  const [, setParams] = useParams();
  return (
    <Stack sx={{ backgroundColor: "#ffff" }}>
      <Grid container>
        <Grid item xs={12} md={3} pt={2} sx={{ backgroundColor: "#e4e4e4" }}>
          <Stack
            spacing={1}
            sx={{
              "@media (min-width: 600px)": {
                position: "fixed",
              },
              "@media (max-width: 600px)": {
                paddingTop: 2,
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
            {!isDetail && (<>
              <TextField
                placeholder="Search"
                onChange={(e) => setParams?.("name",e.target.value)}
                size="small"
                fullWidth
              />
                  <TextField
                    placeholder="Min Birr"
                    type="number"
                    onChange={(e) => setParams?.("min",e.target.value)}
                    size="small"
                    fullWidth
                  /> 
                  {/* <TextField
                    placeholder="Max Birr"
                    type="number"
                    onChange={(e) => setParams?.("max",e.target.value)}
                    size="small"
                    fullWidth
                  /> */}
                
              </>
            )}
            <FilterMenu />
          </Stack>
        </Grid>
        <Grid item xs={12} md={9} minHeight={"100vh"}>
          <Stack spacing={2}>
            <Stack direction={"row"} justifyContent={"center"} zIndex={10}>
              <Typography
                variant="h4"
                textAlign="center"
                sx={{
                  "@media (min-width: 600px)": {
                    position: "fixed",
                    paddingTop: 2,
                  },
                  "@media (max-width: 600px)": {
                    paddingTop: 2,
                  },
                }}
              >
                {header}
              </Typography>
            </Stack>
            <Stack padding={2} pt={8}>
              {children}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
