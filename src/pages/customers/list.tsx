import {
  Grid,
  Stack,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useGetCustomersQuery } from "../../api";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CustomerListLayout, Display } from "./common";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "../../common/search-param";

export const CustomerList = () => {
  const [searchText, setSearchText] = useState("");

  const [params] = useParams();
  const para = useMemo(() => {
    return { 
      name:searchText,
      min:params.get("min")??undefined,
      max:params.get("min")??undefined
    };
  }, [params,searchText]);
  const { data: customers, isLoading } = useGetCustomersQuery(
   para
    );
  const location = useLocation();

  const paramsURL = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  // console.table(customers?.data);
  // const { id } = useParams();

  // const selected = useMemo(
  //   () => customers?.data.find((p) => p.id === id),
  //   [customers?.data, id]
  // );
  return (
    <Stack padding={2} spacing={2}>
      <CustomerListLayout
        header="Share Holders List"
        onChange={(e: string) => {
          setSearchText(e);
          paramsURL.append("name",searchText);
        }}

        
      >
        {isLoading ? (
          <CircularProgress />
        ) : !customers?.data.length ? (
          <Typography sx={{ fontSize: 12 }} padding={10}>
            No Registered Customers Yet
          </Typography>
        ) : (
          <>
            {/* <SimpleDialog user={selected} /> */}
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
