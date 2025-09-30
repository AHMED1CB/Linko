import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Divider,
  Grow,
  Modal,
  TextField,
  Slide,
  Stack,
} from "@mui/material";
import { Edit, Settings, Close, CameraAlt } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 5, px: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
          Profile
        </Typography>
        <IconButton sx={{ color: theme.palette.text.secondary }}>
          <Settings />
        </IconButton>
      </Box>

      <Grow in={animate} timeout={500}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
            position: "relative",
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: theme.palette.primary.main,
                animation: "pulse 2s infinite",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.15)" },
              }}
            >
              J
            </Avatar>
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: theme.palette.background.paper,
                "&:hover": {
                  bgcolor: theme.palette.primary.main,
                  color: "#fff",
                  transform: "scale(1.2)",
                },
              }}
            >
              <CameraAlt />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.text.primary, mt: 2 }}
          >
            John Doe
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            john.doe@example.com
          </Typography>
          <Button
            variant="contained"
            startIcon={<Edit />}
            sx={{
              mt: 2,
              borderRadius: 8,
              px: 3,
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
                transform: "translateY(-2px)",
              },
              "&:active": { transform: "translateY(1px)" },
            }}
            onClick={() => setEditOpen(true)}
          >
            Edit Profile
          </Button>
        </Box>
      </Grow>

      <Divider sx={{ mb: 3, backgroundColor: theme.palette.divider }} />

      <Stack spacing={2}>
        {[
          { label: "Username", value: "@johndoe" },
          { label: "Phone", value: "+1 234 567 890" },
          {
            label: "Bio",
            value: "Passionate about coding and messaging apps.",
          },
          {
            label: "Status",
            value: "Online",
            color: theme.palette.success.main,
          },
        ].map((item, index) => (
          <Grow in={animate} timeout={700 + index * 200} key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: theme.palette.background.paper,
                boxShadow: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
                "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
              }}
            >
              <Typography sx={{ color: theme.palette.text.primary }}>
                {item.label}
              </Typography>
              <Typography
                sx={{ color: item.color || theme.palette.text.secondary }}
              >
                {item.value}
              </Typography>
            </Box>
          </Grow>
        ))}
      </Stack>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Slide direction="up" in={editOpen} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: theme.palette.background.paper,
              p: 3,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              boxShadow: 5,
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.primary }}
              >
                Edit Profile
              </Typography>
              <IconButton
                onClick={() => setEditOpen(false)}
                sx={{ color: theme.palette.text.secondary }}
              >
                <Close />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              label="Username"
              defaultValue="@johndoe"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              defaultValue="+1 234 567 890"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Bio"
              defaultValue="Passionate about coding and messaging apps."
              variant="outlined"
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 2,
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  transform: "translateY(-2px)",
                },
                "&:active": { transform: "translateY(1px)" },
              }}
            >
              Save
            </Button>
          </Box>
        </Slide>
      </Modal>
    </Box>
  );
};

export default ProfilePage;
