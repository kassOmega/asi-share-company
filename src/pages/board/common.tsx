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
import { ReactNode, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { BoardResponse, useDeleteBoardMutation, useUserToken } from "../../api";
import { DeleteDialog, capitalizeFullName } from "../../common";
import { useSnackbar } from "notistack";
export const Display = ({
  user,
  reload,
}: {
  user: BoardResponse;
  reload?: () => void;
}) => {
  const deleteCustomer = useDeleteBoardMutation();
  const { user: userRole } = useUserToken();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmDelete, setConfirmDelete] = useState(false);
  function handleDelete() {
    deleteCustomer.mutate(user?.id ?? "", {
      onSuccess: () => {
        reload?.();
        navigate("/board");
        enqueueSnackbar("User Successfully Deleted", { variant: "success" });
      },
    });
  }
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
              <Button
                variant="outlined"
                size="small"
                sx={{ cursor: "pointer" }}
                component={Link}
                to={`/board/${user.id}`}
              >
                Detail
              </Button>

              {userRole?.role === "admin" && (
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete
                </Button>
              )}
            </Stack>
            <DeleteDialog
              onClose={() => setConfirmDelete(false)}
              open={confirmDelete}
              onDelete={handleDelete}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export interface SimpleDialogProps {
  user?: BoardResponse;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { user } = props;

  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/board");
  };
  const deleteCustomer = useDeleteBoardMutation();
  function handleDelete() {
    deleteCustomer.mutate(user?.id ?? "", {
      onSuccess: () => {
        navigate("/board");
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
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export function FilterMenu() {
  const navigate = useNavigate();

  return (
    <Stack alignItems="flex-start" paddingLeft={4}>
      <TextField fullWidth />
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

export const BoardListLayout = ({
  header,
  children,
}: {
  header: string;
  children: ReactNode;
}) => {
  return (
    <Stack spacing={2} sx={{ backgroundColor: "#ffff" }}>
      <Grid container>
        <Grid xs={12} md={3} pt={2} sx={{ backgroundColor: "#e4e4e4" }}>
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
            <Button component={Link} to="/board/register" variant="outlined">
              Register new Member
            </Button>
          </Stack>
        </Grid>
        <Grid xs={12} md={9} minHeight={"100vh"}>
          <Stack spacing={2}>
            <Stack direction={"row"} justifyContent={"center"}>
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
