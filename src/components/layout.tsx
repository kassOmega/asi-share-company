import { AppBar, Button, Box, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useUserToken } from "../api";
import { ReactNode } from "react";

export type ASILayoutProps = {
  children: ReactNode;
};
export const ASILayout: React.FC<ASILayoutProps> = (props) => {
  const { authBearer } = useUserToken();
  const { children } = props;
  return (
    <Stack height="100vh">
      <AppBar position="fixed">
        <Toolbar>
          <Typography>ASI Share Company</Typography>
          <Box width={16} />
          <Button component={Link} to="/board" variant="contained">
            Boards
          </Button>
          <Button component={Link} to="/customers" variant="contained">
            Customers
          </Button>
          <Button onClick={() => authBearer()} variant="contained">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box height="64px" />
      <Box overflow="auto" flex={1}>
        {children}
      </Box>
    </Stack>
  );
};
