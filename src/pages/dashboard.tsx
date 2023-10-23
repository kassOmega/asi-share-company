import {
  CircularProgress,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useGetCustomersStatQuery } from "../api";

export const Dashboard = () => {
  const { data: stat, isLoading } = useGetCustomersStatQuery();
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Stack paddingTop={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Total Share Holders</Typography>
                  <Typography>{stat?.data.totalShareHolders.toLocaleString("en-US")}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Total Promised Share To Buy</Typography>
                  <Typography>{stat?.data.totalRequestedShare.toLocaleString("en-US")}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  {" "}
                  <Typography>Total Paid Share Of Promised Share</Typography>
                  <Typography>{stat?.data.totalPaidShare.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={data.totalPaidShare} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>
                    Total Share Holders With Completely Payment
                  </Typography>
                  <Typography>
                    {stat?.data.totalShareHoldersCompletelyPaid.toLocaleString("en-US")}
                  </Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Total Amount of Promised Money</Typography>
                  <Typography>
                    ETB {stat?.data.totalSharePromisedAmount.toLocaleString("en-US")}
                  </Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Total Amount of Paid Money</Typography>
                  <Typography>ETB {stat?.data.totalSharePaidAmount.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>


              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Customers Started Payment</Typography>
                  <Typography> {stat?.data.startedPay.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>


                  {/* ABOVE 10K  */}
              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Customers Paid 10K And Above</Typography>
                  <Typography> {stat?.data.customerspaid10kAndAbove.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Money Paid 10K And Above</Typography>
                  <Typography>ETB {stat?.data.moneyPaid10kAndAbove.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Money Promised 10K And Above</Typography>
                  <Typography> ETB {stat?.data.promisedMoney10kAndAbove.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Shares Paid 10K And Above</Typography>
                  <Typography> {stat?.data.paidShare10kAndAbove.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Promised Share 10K And Above</Typography>
                  <Typography> {stat?.data.promisedShare10kAndAbove.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>


                  {/* BELOW 10K  */}

                  <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Customers Paid Below 10K</Typography>
                  <Typography> {stat?.data.customersPaidBelow10k.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Money Paid Below 10K</Typography>
                  <Typography>ETB {stat?.data.moneyPaidBelow10k.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Money Promised Below 10K</Typography>
                  <Typography>ETB {stat?.data.promisedMoneyBelow10k.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Shares Paid Below 10K</Typography>
                  <Typography> {stat?.data.paidShareBelow10k.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack
                  boxShadow={5}
                  borderRadius={10}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Promised Share Below 10K</Typography>
                  <Typography> {stat?.data.promisedShareBelow10k.toLocaleString("en-US")}</Typography>
                  <LinearProgress value={40} color="success" />
                </Stack>
              </Grid>



            </Grid>
          </Stack>
        </>
      )}
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
