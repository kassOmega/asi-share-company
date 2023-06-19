import { createTheme } from "@mui/material";
import { palettes } from "./colors";
import { MuiButton, MuiCard } from "./components";
import { typography } from "./typography";

export const theme = createTheme({
  palette: palettes,
  components: {
    MuiButton,
    MuiCard,
  },
  typography: typography,
});
