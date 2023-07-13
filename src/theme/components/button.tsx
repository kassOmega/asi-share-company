import { Components } from "@mui/material";
import { baseTheme } from "../themebase";

export const MuiButton: Components["MuiButton"] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      borderRadius: "1000px",
      padding: baseTheme.spacing(1, 1),
      fontWeight: 600,
    },
  },
};
