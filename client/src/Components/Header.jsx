import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useContext } from "react";
import { ThemeContext }  from "../app/Contexts/ThemeContext";
function Header() {
    const isLoggedIn = false;
    const { theme  , setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={'/'} className="logo-container">
            <img src="/logo.svg" alt="AppLogo" className="logo" id="logo" />
            <Typography variant="h2">Linko</Typography>
          </Link>

          <Box>
            {isLoggedIn ? (
              <>
                <Link to="/" color="inherit">
                  Home
                </Link>
                {/* Will Set it on Future */}
                <Link to="/user/{userId}" color="inherit">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/login" color="inherit">
                  Login
                </Link>
                <Link to="/auth/register" color="inherit">
                  Sign Up
                </Link>
              </>
            )}
            <IconButton onClick={toggleTheme} className="text-light">
              {" "}
              {theme === "light" ? (
                <LightModeOutlinedIcon />
              ) : (
                <ModeNightOutlinedIcon />
              )}{" "}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
