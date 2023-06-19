import { Components, alpha } from "@mui/material";
import { baseTheme } from "../themebase";
export const MuiCard: Components["MuiCard"] = {
  styleOverrides: {
    root: {
      borderRadius: baseTheme.spacing(2),
      boxShadow: `0px 0px 12px ${alpha(baseTheme.palette.common.black, 0.1)}`,
    },
  },
};
