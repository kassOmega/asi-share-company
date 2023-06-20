import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { useGetCustomersStatQuery } from "../api";

export const Dashboard = () => {
  const { data: stat, isLoading } = useGetCustomersStatQuery();
  console.log(stat);
  const data = linearBar(
    stat?.data.totalShareHolders ?? 0,
    stat?.data.totalRequestedShare ?? 0,
    stat?.data.totalPaidShare ?? 0,
    stat?.data.totalShareHoldersCompletelyPaid ?? 0
  );
  return (
    <Stack padding={2} spacing={2}>
      <Stack alignItems="center" justifyContent="center" padding={4}>
        <Typography variant="h5">ASI Share Company</Typography>
        <Typography variant="body1">Users Statistics </Typography>
      </Stack>
      <Stack paddingTop={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack
              boxShadow={5}
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
            >
              <Typography>Total Share Holders</Typography>
              <Typography>{stat?.data.totalShareHolders}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              boxShadow={5}
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
            >
              <Typography>Total Promised Share To Buy</Typography>
              <Typography>{stat?.data.totalRequestedShare}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              boxShadow={5}
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
            >
              {" "}
              <Typography>Total Paid Share Of Promised Share</Typography>
              <Typography>{stat?.data.totalPaidShare}</Typography>
              <LinearProgress value={data.totalPaidShare} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              boxShadow={5}
              borderRadius={10}
              alignItems="center"
              justifyContent="center"
            >
              <Typography>
                Total Share Holders With Completed Payment
              </Typography>
              <Typography>
                {stat?.data.totalShareHoldersCompletelyPaid}
              </Typography>
              <LinearProgress value={40} color="success" />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

function linearBar(
  totalUser: number,
  totalPromised: number,
  totalPaid: number,
  userFullyPaid: number
) {
  const userFullyPaidPercent = (userFullyPaid / totalUser) * 100;
  const totalPaidShare = (totalPaid / totalPromised) * 100;
  const data = { userFullyPaidPercent, totalPaidShare };
  return data;
}
