import { Grid, Stack, Button, Typography } from "@mui/material";
import { useGetBoardQuery } from "../../api";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BoardListLayout, Display, SimpleDialog } from "./common";

export const BoardList = () => {
  const { data: members } = useGetBoardQuery();
  console.table(members?.data);
  const { id } = useParams();

  const selected = useMemo(
    () => members?.data.find((p) => p.id === id),
    [members?.data, id]
  );
  return (
    <Stack padding={2} spacing={2}>
      <BoardListLayout header="Board Members List">
        {!members?.data.length ? (
          <Typography sx={{ fontSize: 12 }} padding={10}>
            No Members Registered Yet
          </Typography>
        ) : (
          <>
            <SimpleDialog user={selected} />
            <Grid container spacing={1}>
              {members?.data.map((customer) => (
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
              <Button disabled={members?.data && members?.data.length <= 20}>
                <ArrowBackIosNewIcon /> Prev
              </Button>
              <Button disabled={members?.data && members?.data.length <= 20}>
                next <ArrowForwardIosIcon />
              </Button>
            </Stack>
          </>
        )}
      </BoardListLayout>
    </Stack>
  );
};
