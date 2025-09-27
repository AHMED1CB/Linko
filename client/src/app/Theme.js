import { createTheme } from "@mui/material/styles";

const dark = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
      disabled: "#757575",
      message: "#1e1e1e"
    },
    primary: {
      main: "#1DB954",
      dark: "#1aa34a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2a2a2a",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    success: {
      main: "#1DB954",
    },
    warning: {
      main: "#f1c40f",
    },
    error: {
      main: "#e74c3c",
    },
    info: {
      main: "#3498db",
    },
    divider: "#2c2c2c",
    action: {
      selected: "#1f1f1f",
      hover: "#2a2a2a",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 2px rgba(0,0,0,0.2)",
    "0 4px 6px rgba(0,0,0,0.25)",
    "0 10px 20px rgba(0,0,0,0.35)",
    "0 10px 20px rgba(0,0,0,0.2)",
  ],
});

const light = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#191414",
      secondary: "#555555",
      disabled: "#9e9e9e",
    },
    primary: {
      main: "#1DB954",
      dark: "#1aa34a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f1f3f5",
      dark: "#dfe2e6",
      contrastText: "#191414",
    },
    success: {
      main: "#1DB954",
    },
    warning: {
      main: "#f1c40f",
    },
    error: {
      main: "#e74c3c",
    },
    info: {
      main: "#3498db",
    },
    divider: "#e0e0e0",
    action: {
      selected: "#f1f3f5",
      hover: "#f5f5f5",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 2px rgba(0,0,0,0.05)",
    "0 4px 6px rgba(0,0,0,0.1)",
    "0 10px 20px rgba(0,0,0,0.15)",
    "0 10px 20px rgba(0,0,0,0.1)",
  ],
});

const theme = { light, dark };

export default theme;
