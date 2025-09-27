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
  InputBase,
  Slide,
} from "@mui/material";
import {
  AccountCircle,
  Lock,
  Notifications,
  Language,
  DarkMode,
  ExitToApp,
  Search,
} from "@mui/icons-material";

export default function SettingsPage() {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "95%",
        bgcolor: "background.default",
      }}
      className="setting-container"
    >
     

      <Box sx={{ flex: 1, overflowY: "auto", p: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            px: 2,
            py: 1,
            boxShadow: 1,
          }}
        >
          <Search color="action" />
          <InputBase placeholder="Search settings..." sx={{ ml: 1, flex: 1 }} />
        </Box>


        <Slide direction="up" in mountOnEnter unmountOnExit>
          <Paper variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
            <Typography variant="subtitle2" sx={{ px: 2, pt: 2, fontWeight: "bold" }}>
              Account
            </Typography>
            <List>
              <ListItem  sx={{ "&:hover": { bgcolor: "action.hover" } }}>
                <ListItemIcon>
                  <AccountCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="Profile" secondary="Edit account info" />
              </ListItem>
              <Divider />
              <ListItem button sx={{ "&:hover": { bgcolor: "action.hover" } }}>
                <ListItemIcon>
                  <Lock color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="Privacy & Security"
                  secondary="Password, blocked users"
                />
              </ListItem>
            </List>
          </Paper>
        </Slide>

        <Slide direction="up" in mountOnEnter unmountOnExit>
          <Paper variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
            <Typography variant="subtitle2" sx={{ px: 2, pt: 2, fontWeight: "bold" }}>
              Preferences
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Notifications color="primary" />
                </ListItemIcon>
                <ListItemText primary="Notifications" secondary="Enable alerts" />
                <Switch edge="end" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <DarkMode color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Dark Mode" />
                <Switch edge="end" />
              </ListItem>
            </List>
          </Paper>
        </Slide>

        <Slide direction="up" in mountOnEnter unmountOnExit>
          <Paper variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
            <Typography variant="subtitle2" sx={{ px: 2, pt: 2, fontWeight: "bold" }}>
              App
            </Typography>
            <List>
              <ListItem button sx={{ "&:hover": { bgcolor: "action.hover" } }}>
                <ListItemIcon>
                  <Language color="primary" />
                </ListItemIcon>
                <ListItemText primary="Language" secondary="English" />
              </ListItem>
              <Divider />
              <ListItem button sx={{ "&:hover": { bgcolor: "action.hover" } }}>
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
}
