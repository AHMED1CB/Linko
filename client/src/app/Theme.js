import { createTheme } from "@mui/material/styles";

const shadows = [
  "none",
  "0px 1px 3px rgba(0,0,0,0.2), 0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
  "0px 1px 5px rgba(0,0,0,0.2), 0px 2px 2px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
  "0px 1px 8px rgba(0,0,0,0.2), 0px 3px 4px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)",
  "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px rgba(0,0,0,0.14), 0px 1px 10px rgba(0,0,0,0.12)",
  "0px 3px 5px rgba(0,0,0,0.2), 0px 5px 8px rgba(0,0,0,0.14), 0px 1px 14px rgba(0,0,0,0.12)",
  "0px 3px 5px rgba(0,0,0,0.2), 0px 6px 10px rgba(0,0,0,0.14), 0px 1px 18px rgba(0,0,0,0.12)",
  "0px 4px 5px rgba(0,0,0,0.2), 0px 7px 10px rgba(0,0,0,0.14), 0px 2px 16px rgba(0,0,0,0.12)",
  "0px 5px 5px rgba(0,0,0,0.2), 0px 8px 10px rgba(0,0,0,0.14), 0px 3px 14px rgba(0,0,0,0.12)",
  "0px 5px 6px rgba(0,0,0,0.2), 0px 9px 12px rgba(0,0,0,0.14), 0px 3px 16px rgba(0,0,0,0.12)",
  "0px 6px 6px rgba(0,0,0,0.2), 0px 10px 14px rgba(0,0,0,0.14), 0px 4px 18px rgba(0,0,0,0.12)",
  "0px 6px 7px rgba(0,0,0,0.2), 0px 11px 15px rgba(0,0,0,0.14), 0px 4px 20px rgba(0,0,0,0.12)",
  "0px 7px 8px rgba(0,0,0,0.2), 0px 12px 17px rgba(0,0,0,0.14), 0px 5px 22px rgba(0,0,0,0.12)",
  "0px 7px 8px rgba(0,0,0,0.2), 0px 13px 19px rgba(0,0,0,0.14), 0px 5px 24px rgba(0,0,0,0.12)",
  "0px 7px 9px rgba(0,0,0,0.2), 0px 14px 21px rgba(0,0,0,0.14), 0px 5px 26px rgba(0,0,0,0.12)",
  "0px 8px 9px rgba(0,0,0,0.2), 0px 15px 22px rgba(0,0,0,0.14), 0px 6px 28px rgba(0,0,0,0.12)",
  "0px 8px 10px rgba(0,0,0,0.2), 0px 16px 24px rgba(0,0,0,0.14), 0px 6px 30px rgba(0,0,0,0.12)",
  "0px 8px 11px rgba(0,0,0,0.2), 0px 17px 26px rgba(0,0,0,0.14), 0px 6px 32px rgba(0,0,0,0.12)",
  "0px 9px 11px rgba(0,0,0,0.2), 0px 18px 28px rgba(0,0,0,0.14), 0px 7px 34px rgba(0,0,0,0.12)",
  "0px 9px 12px rgba(0,0,0,0.2), 0px 19px 29px rgba(0,0,0,0.14), 0px 7px 36px rgba(0,0,0,0.12)",
  "0px 10px 13px rgba(0,0,0,0.2), 0px 20px 31px rgba(0,0,0,0.14), 0px 8px 38px rgba(0,0,0,0.12)",
  "0px 10px 13px rgba(0,0,0,0.2), 0px 21px 33px rgba(0,0,0,0.14), 0px 8px 40px rgba(0,0,0,0.12)",
  "0px 10px 14px rgba(0,0,0,0.2), 0px 22px 35px rgba(0,0,0,0.14), 0px 8px 42px rgba(0,0,0,0.12)",
  "0px 11px 14px rgba(0,0,0,0.2), 0px 23px 36px rgba(0,0,0,0.14), 0px 9px 44px rgba(0,0,0,0.12)",
  "0px 11px 15px rgba(0,0,0,0.2), 0px 24px 38px rgba(0,0,0,0.14), 0px 9px 46px rgba(0,0,0,0.12)",
];

const dark = createTheme({
  shadows,
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

});

const light = createTheme({
  shadows,
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
