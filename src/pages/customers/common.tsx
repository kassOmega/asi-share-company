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
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { customersResponse } from "../../api";

export const Display = ({ user }: { user: customersResponse }) => {
  const navigate = useNavigate();

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
          <Grid item xs={6} md={6}>
            <Typography>Full Name</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography>{user.fullName}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography>Address</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography>{user.address}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography>Phone Number</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography>{user.phoneNumber}</Typography>
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
      </Stack>
    </Stack>
  );
};

export interface SimpleDialogProps {
  user?: customersResponse;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { user } = props;

  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/customers");
  };

  return (
    <Dialog onClose={handleClose} open={!!user}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Stack>
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
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export function FilterMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack alignItems="center" justifyContent="center">
      <Button
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          alignContent: "center",
          alignItems: "center",
          textAlign: "center",
          ":hover": { backgroundColor: "white" },
        }}
      >
        <FilterAltIcon sx={{ fontSize: 40 }} />
        Filter
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/customers");
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/customers/fully-paid");
          }}
        >
          Fully Paid
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/customers/fully-unpaid");
          }}
        >
          Fully Unpaid
        </MenuItem>
      </Menu>
    </Stack>
  );
}
