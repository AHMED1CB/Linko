import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Switch,
  Paper,
  Slide,
} from "@mui/material";
import { Notifications, DarkMode, ExitToApp } from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../app/Contexts/ThemeContext";
import Cookie from "../app/Helpers/Cookie";
import { useNavigate } from "react-router-dom";

export default () => {
  const { setTheme, theme } = useContext(ThemeContext);
  const go = useNavigate();

  const changeTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  const logOutUser = () => {
    Cookie.delete("authorization");
    go("/auth/login");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        margin: " 16px 0 40px 0 ",
      }}
      className="setting-container"
    >
      <Box sx={{ overflowY: "auto" }}>
        <Slide direction="up" in mountOnEnter unmountOnExit>
          <Paper variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ px: 2, pt: 2, fontWeight: "bold" }}
            >
              Preferences
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DarkMode color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Dark Mode" />
                <Switch
                  edge="end"
                  checked={theme == "dark"}
                  onChange={changeTheme}
                />
              </ListItem>
            </List>
          </Paper>
        </Slide>

        <Slide direction="up" in mountOnEnter unmountOnExit>
          <Paper variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ px: 2, pt: 2, fontWeight: "bold" }}
            >
              App
            </Typography>
            <List>
              <ListItem
                onClick={logOutUser}
                sx={{
                  "&:hover": { bgcolor: "action.hover" },
                  cursor: "pointer",
                  borderRadius: "18px",
                }}
              >
                <ListItemIcon>
                  <ExitToApp color="error" />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </List>
          </Paper>
        </Slide>
      </Box>
    </Box>
  );
};
