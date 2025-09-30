import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
      }}
    >
      <Box
        component="img"
        src="/logo.svg"
        alt="App Logo"
        sx={{ width: 100, height: 100, mb: 2 }}
      />

      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 3 }}>
        Oops! The page you are looking for doesn’t exist.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ borderRadius: 2, px: 4, py: 1.2 }}
      >
        Back To Home
      </Button>
    </Box>
  );
}
