import { ThemeOptions } from "@mui/material";
import { baseTheme } from "./themebase";

export const typography: ThemeOptions["typography"] = {
  fontFamily: "Roboto",
  h1: { fontSize: "48px", fontWeight: 800 },
  h2: { fontSize: "36px", fontWeight: 800 },
  h3: { fontSize: "24px", fontWeight: 600 },
  h4: { fontSize: "20px", fontWeight: 600 },
  h5: { fontSize: "16px", fontWeight: 600 },
  h6: { fontSize: "16px", fontWeight: 400 },
  body1: { fontSize: "16px", lineHeight: 1.7 },
  body2: { fontSize: "12px", lineHeight: 1 },
  button: { lineHeight: 1 },
  overline: {
    fontWeight: 800,
    color: baseTheme.palette.primary.dark,
    lineHeight: 1.2,
  },
  caption: {
    color: baseTheme.palette.text.secondary,
    fontSize: "16px",
    lineHeight: 1.2,
  },
};
