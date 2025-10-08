import { Box } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import "../assets/css/Home.css";
import SideBar from "./SideBar";

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        height: "95vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Sidebar */}
      <SideBar fullWidth/>

      <Box className="welcome-msg">
        <img src="/logo.svg" alt="" />
        <h2>Welcome To Linko RealTime Chat App!</h2>
      </Box>
    </Box>
  );
};

export default HomePage;
