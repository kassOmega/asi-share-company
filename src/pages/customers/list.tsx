import { Grid, Stack } from "@mui/material";
import { useGetCustomersQuery } from "../../api";

export const CustomerList = () => {
  const { data: customers } = useGetCustomersQuery();
  console.table(customers?.data);
  return (
    <Stack>
      <Grid></Grid>
    </Stack>
  );
};
