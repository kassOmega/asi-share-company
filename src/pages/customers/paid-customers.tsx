import { Grid, Stack, Button } from "@mui/material";
import { useGetPaidCustomersQuery } from "../../api";
import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { Display, FilterMenu, SimpleDialog } from "./common";

export const PaidCustomerList = () => {
  const { data: customers } = useGetPaidCustomersQuery();
  console.table(customers?.data);
  const { id } = useParams();

  const selected = useMemo(
    () => customers?.data.find((p) => p.id == id),
    [customers?.data, id]
  );
  return (
    <Stack padding={2} spacing={2}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        spacing={2}
      >
        <Button component={Link} to="/customers/register" variant="contained">
          Register Customer
        </Button>
        <FilterMenu />
      </Stack>
      <SimpleDialog user={selected} />
      <Grid container spacing={1}>
        {customers?.data.map((customer) => (
          <Grid key={customer.id} item xs={12} md={4}>
            <Display user={customer} key={customer.id} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
