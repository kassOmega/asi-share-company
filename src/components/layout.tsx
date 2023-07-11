import { AppBar, Button, Box, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useUserToken } from "../api";
import { ReactNode } from "react";
import { ReactComponent as Logo } from "../pages/logo.svg";

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
          <Stack
            direction="row"
            sx={{
              "@media (min-width: 600px)": {
                justifyContent: "space-between",
              },
              "@media (max-width: 600px)": {
                paddingTop: 2,
              },
            }}
            flex={1}
          >
            <Stack direction="row" spacing={2}>
              <Box component={Link} to="/">
                <Logo height={50} width={50} />
              </Box>
              <Box width={16} />
              {/* <Button to="/" variant="contained">
                <HomeIcon sx={{ fontSize: 30 }} />
              </Button> */}
              <Button component={Link} to="/board" variant="contained">
                Boards
              </Button>
              <Button component={Link} to="/customers" variant="contained">
                Customers
              </Button>
            </Stack>
            <Stack direction="row">
              <Button onClick={() => authBearer()} variant="contained">
                Logout
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box height="64px" />
      <Box overflow="auto" flex={1} sx={{ backgroundColor: "#e4e4e4" }}>
        {children}
      </Box>
    </Stack>
  );
};
