import { Grid, Stack, Button, Typography } from "@mui/material";
import { useGetUnpaidCustomersQuery } from "../../api";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CustomerListLayout, Display, SimpleDialog } from "./common";

export const UnpaidCustomerList = () => {
  const { data: customers } = useGetUnpaidCustomersQuery();
  console.table(customers?.data);
  const { id } = useParams();

  const selected = useMemo(
    () => customers?.data.find((p) => p.id === id),
    [customers?.data, id]
  );
  return (
    <Stack padding={2} spacing={2}>
      <CustomerListLayout header="Share Holders List with remaining payment">
        {!customers?.data.length ? (
          <Typography sx={{ fontSize: 12 }} padding={10}>
            No Customers Registered Yet
          </Typography>
        ) : (
          <>
            <SimpleDialog user={selected} />
            <Grid container spacing={1}>
              {customers?.data.map((customer) => (
                <Grid key={customer.id} item xs={12} md={4}>
                  <Display user={customer} key={customer.id} />
                </Grid>
              ))}
            </Grid>
            <Stack
              spacing={2}
              direction={"row"}
              alignItems={"flex-end"}
              alignSelf={"end"}
              display="block"
            >
              <Button
                disabled={customers?.data && customers?.data.length <= 20}
              >
                <ArrowBackIosNewIcon /> Prev
              </Button>
              <Button
                disabled={customers?.data && customers?.data.length <= 20}
              >
                next <ArrowForwardIosIcon />
              </Button>
            </Stack>
          </>
        )}
      </CustomerListLayout>
    </Stack>
  );
};
